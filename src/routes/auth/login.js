import _ from "lodash";
import bcrypt from 'bcrypt';
import passport from "passport";
import User from "../../models/user";
import buildResponse from '../../utils/responseBuilder';
import { APP_KEYS, MESSAGES, RESPONSE_TYPES } from '../../configs/constants';
import { createGoogleUser, readUser } from "../../models/services/userServices";

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//serialize user
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, done)=>{
    try {
        const user = await User.findOne({_id: id});
        done(null, user);
    } catch (err) {
        done (err, null);
    }
});

// configure passport to use the google strategy
passport.use(new GoogleStrategy({
    clientID: APP_KEYS.AUTH.GOOGLE.CLIENT_ID,
    clientSecret: APP_KEYS.AUTH.GOOGLE.CLIENT_SECRET,
    callbackURL: APP_KEYS.AUTH.GOOGLE.CALLBACK_URL
},async (accessToken, refreshToken, profile, done) => {
    // todo add this entry in mongo db - this is where the patch call will be used
    try {
        // user details
        const user = {
            email: _.get(profile, "emails[0].value"),
            firstName: _.get(profile, "name.givenName"),
            lastName: _.get(profile, "name.familyName"),
            profilePhoto: _.get(profile, "photos[0].value"),
            source: "google"
        };

        const currentUser = await readUser({}, user);

        if (currentUser && currentUser.source !== "google") {
            //return error
            return done(null, false, { message: `You have previously signed up with a different signin method` });
        }

        if (!currentUser) {
            const newUser = await createGoogleUser(user);
            return done(null, newUser);
        } else {
            return done(null, currentUser);
        }
    } catch (err) {
        return done(err, null);
    }
}));

// configure passport to use a local strategy
passport.use(new LocalStrategy(  {usernameField: 'email', passwordField: "password" },  async function(username, password, done){
    try{
        const user = await User.findOne({email: username.toLowerCase()});
        if(user === null) {
            const loginError = new Error(MESSAGES.USER_LOGIN_FAILURE_INCORRECT_EMAIL, { cause: RESPONSE_TYPES.USER_LOGIN_FAILURE });
            done(loginError);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
            done(null, user)
        } else {
            const loginError = new Error(MESSAGES.USER_LOGIN_FAILURE_INCORRECT_PASSWORD, { cause: RESPONSE_TYPES.USER_LOGIN_FAILURE });
            done(loginError);
        }
    } catch (err) {
        done({"error": err.message});
    }

}));

const _promisifyPassport =  async (req, res, next) => {
    try{
        const user = await new Promise((resolve, reject)=>{
            passport.authenticate('local', async (err, user, info) => {
                if(err){
                    reject(err);
                }
                resolve(user);
            })(req, res, next);
        });
        return user;
    } catch (err) {
        throw err;
    }

};

const registerLoginRouter = (router) => {

    // get login request with credentials
    router.post("/login", async (req, res, next) => {
        try {
            const user = await _promisifyPassport(req, res, next);
            req.login(user, (err) => {
                let response;
                if(err){
                    response = buildResponse(req, RESPONSE_TYPES.USER_LOGIN_FAILURE, err);
                } else {
                    const _user = {
                        email: user.email,
                        name: user.name
                    }
                    response = buildResponse(req, RESPONSE_TYPES.USER_LOGIN_SUCCESS, MESSAGES.USER_LOGIN_SUCCESS);
                }

                return res.send(response);
            })
        } catch (err) {
            let response;
            if(err && err.cause === RESPONSE_TYPES.USER_LOGIN_FAILURE) {
                response = buildResponse(req, RESPONSE_TYPES.USER_LOGIN_FAILURE, err);
                return res.send(response);
            } else {
                return res.status(400).send(err);
            }
        }
    });

    // google authentication
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get( '/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/failure' }), async (req, res)=> {
           res.redirect("/");
        }
    );

    router.get( '/google/failure', async (req, res)=> {
            // todo show failure message
            res.redirect("/");
        }
    );

};


export default registerLoginRouter;
