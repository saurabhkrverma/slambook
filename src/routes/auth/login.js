import bcrypt from 'bcrypt';
import passport from "passport";
var LocalStrategy = require('passport-local').Strategy;
import User from "../../models/user";
import buildResponse from '../../utils/responseBuilder';
import { MESSAGES } from '../../configs/constants'
import { RESPONSE_TYPES } from '../../configs/constants';

// configure passport to use a local strategy
passport.use(new LocalStrategy(  {usernameField: 'email', passwordField: "password" },  async function(username, password, done){
    try{
        const user = await User.findOne({email: username});
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

//serialize user
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, done)=>{
    try {
        const user = await User.findOne({id: id});
        done(null, user);
    } catch (err) {
        done (err, null);
    }
});

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

};


export default registerLoginRouter;
