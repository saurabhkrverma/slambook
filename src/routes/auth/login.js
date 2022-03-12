import passport from "passport";
import buildResponse from '../../utils/responseBuilder';
import {  MESSAGES, RESPONSE_TYPES } from '../../configs/constants';


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
            if(req.session) {
                req.session.messages = [ MESSAGES.USER_LOGIN_GOOGLE_SUCCESS ];
            }
            res.redirect("/");
        }
    );

    router.get( '/google/failure', async (req, res)=> {
        if(req.session) {
            req.session.errors = [ MESSAGES.USER_LOGIN_GOOGLE_FAILURE ];
        }
            res.redirect("/");
        }
    );

};


export default registerLoginRouter;
