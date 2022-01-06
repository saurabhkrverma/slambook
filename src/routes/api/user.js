import User from "../../models/user";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"

const registerUserRouter = (router) => {
    // get all users
    router.get("/users", async(req, res) => {
        const users = await User.find();
        const response = buildResponse(req, RESPONSE_TYPES.GET_USERS_SUCCESS, users);
        res.send(response);
    });

    // get user
    router.get("/users/:email", async(req, res) => {
        try {
            const users = await User.find({email: req.params.email});
            res.send(users);
        } catch (error) {
            res.send(error);
        }

    });

    // add user
    router.post("/user", async(req,res) => {
        try {
            const email = req.body.email ? req.body.email.toLowerCase() : undefined;
            const name = req.body.name;
            const user = new User({
                email: email,
                name: name
            });
            const hashedPassword = await user.hashPassword(req.body.password);
            user.password = hashedPassword;
            await user.save();
            const response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_SUCCESS, MESSAGES.USER_REGISTRATION_SUCCESS);
            res.send(response);
        } catch (error) {
            if(error.code === 11000) {
                const response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_FAILURE, MESSAGES.USER_REGISTRATION_FAILURE_EMAIL_EXISTS);
               res.status(409).send(response);
            } else {
                const response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_FAILURE, MESSAGES.USER_REGISTRATION_FAILURE_EMAIL_EXISTS);
                res.send(response);
            }
        }

    });

    // delete user
    router.delete("/user/:email", async(req,res)=>{
        try{
            const email = req.params.email ? req.params.email.toLowerCase() : undefined;
            const user = await User.deleteOne({email: email})
            res.status(204).send();
        } catch (error) {

            res.send(error);
        }
    });

    //update user
    router.patch("/user/:email", async(req,res)=>{
        try{
            const email = req.params.email ? req.params.email.toLowerCase() : undefined;
            const user = await User.findOne({email: email})

            if(!user) {
                res.status(404).send();
            }

            if(req.body.name){
                user.name = req.body.name;
            }

            await user.save();
            res.send(user);
        } catch(error) {
            res.send(error);
        }
    })
};

export default registerUserRouter;
