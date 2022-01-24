import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import { updatePassword } from "../../models/utils/userQueries"

const resetInfoRouter = (router) => {
    //update user
    router.patch("/reset/password", async(req,res)=>{
        try{
            const passwordUpdated = await updatePassword(req);
            const response = buildResponse(req, RESPONSE_TYPES.USER_PASSWORD_RESET_SUCCESS, MESSAGES.USER_PASSWORD_RESET_SUCCESS);
            res.send(response);
        } catch(error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.USER_PASSWORD_RESET_FAILURE, MESSAGES.USER_PASSWORD_RESET_FAILURE);
            res.send(response);
        }
    })
};

export default resetInfoRouter;
