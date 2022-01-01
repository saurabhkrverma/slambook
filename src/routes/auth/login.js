import bcrypt from 'bcrypt';
import passport from "passport";
var LocalStrategy = require('passport-local').Strategy;
import User from "../../models/user";

// configure passport to use a local strategy
passport.use(new LocalStrategy(  {usernameField: 'email', passwordField: "password" },  async function(username, password, done){
    try{
        const user = await User.findOne({email: username});
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
            done(null, user)
        } else {
            done({"error": "incorrect password"});
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
    } catch (error) {
        throw error;
    }

};

const registerLoginRouter = (router) => {

    // get login request with credentials
    router.post("/login", async (req, res, next) => {
        try {
            const user = await _promisifyPassport(req, res, next);
            req.login(user, (err) => {
                const response = {
                    email: user.email,
                    name: user.name
                }
                return res.send(response);
            })
        } catch (error) {
            return res.status(400).send(error);
        }
    });

};


export default registerLoginRouter;
