import User from "../../models/user";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import { readUser, readUsers, createUser, deleteUser, updateUser } from "../../models/utils/userQueries"

const registerUserRouter = (router) => {
    // get all users
    router.get("/users", async(req, res) => {
        const users = await readUsers(req);
        const response = buildResponse(req, RESPONSE_TYPES.USER_FETCH_SUCCESS, users);
        res.send(response);
    });

    // get user
    router.get("/users/:email", async(req, res) => {
        try {
            const users = await readUser(req);
            res.send(users);
        } catch (error) {
            res.send(error);
        }

    });

    // add user
    router.post("/user", async(req,res) => {
        try {
            const userCreated = await createUser(req);
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
            const userDeleted = await deleteUser(req);
            res.status(204).send();
        } catch (err) {
            console.log(err)
            res.send(err);
        }
    });

    //update user
    router.patch("/user/:email", async(req,res)=>{
        try{
            const userUpdated = updateUser(req);
            res.send(user);
        } catch(error) {
            res.send(error);
        }
    })
};

export default registerUserRouter;
