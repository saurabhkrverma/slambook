import User from "../../models/user";
import {MESSAGES, RESPONSE_CODES, RESPONSE_TYPES} from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import { readUser, readUsers, createUser, deleteUser, updateUser } from "../../models/services/userServices"
import { getUserStatus, generateOTPAndSendMail } from "../../utils/userRequestUtils";

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
            let response;
            const userStatus = getUserStatus(req);
            if(userStatus === RESPONSE_CODES.USER.REGISTRATION.VALIDATED) {
                const userCreated = await createUser(req);
                response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_SUCCESS, MESSAGES.USER_REGISTRATION_SUCCESS);
            }  else if (userStatus === RESPONSE_CODES.USER.REGISTRATION.REQUEST_OTP) {
                const otpHash = generateOTPAndSendMail(req);
                response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_OTP_REQUEST, {
                    "message": MESSAGES.USER_REGISTRATION_OTP_REQUEST,
                    "data": {
                        otpHash
                    }
                });
            } else {
                response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_INVALID_OTP, MESSAGES.USER_REGISTRATION_INVALID_OTP);
            }
            res.send(response);
        } catch (error) {
            console.log("check this error:", error);
            if(error.code === 11000) {
                const response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_FAILURE, MESSAGES.USER_REGISTRATION_FAILURE_EMAIL_EXISTS);
                res.status(409).send(response);
            } else {
                const response = buildResponse(req, RESPONSE_TYPES.USER_REGISTRATION_FAILURE, MESSAGES.USER_REGISTRATION_FAILURE);
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
    router.patch("/user", async(req,res)=>{
        try{
            const userUpdated = await updateUser(req);
            const response = buildResponse(req, RESPONSE_TYPES.USER_UPDATION_SUCCESS, MESSAGES.USER_UPDATION_SUCCESS);
            res.send(response);
        } catch(error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.USER_UPDATION_FAILURE, MESSAGES.USER_UPDATION_FAILURE);
            res.send(response);
        }
    })
};

export default registerUserRouter;
