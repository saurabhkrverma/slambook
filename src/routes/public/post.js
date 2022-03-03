import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants";
import { buildResponse } from "../../utils/responseBuilder";
import  { createPost } from "../../models/services/postServices";
import { readCollectionWithUserDetails } from "../../models/services/collectionServices";
import { createNotification } from "../../models/services/notificationServices";
import { shouldSavePost } from "../../utils/postRequestUtils"


const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/:postId", async(req, res) => {
        try {
            const post = await readCollectionWithUserDetails(req);
            req.session.post = post;
            res.redirect("/");
        } catch (err) {
            return res.redirect("/");
        }
    });

    // add post
    router.post("/post", async(req,res) => {
        try {
            const verifiedPost = shouldSavePost(req);
            let response = {};
            if(verifiedPost) {
                const postSaved = await createPost(req);
                // No need to wait for notification to be created
                const notificationCreated = createNotification(req);
                response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_SUCCESS, MESSAGES.POST_SUBMISSION_SUCCESS);
            } else {
                response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_OTP_REQUEST, MESSAGES.POST_SUBMISSION_OTP_REQUEST);
            }
            return res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_FAILURE, MESSAGES.POST_SUBMISSION_FAILURE);
            return res.send(response);
        }
    });
};

export default registerPostRouter;
