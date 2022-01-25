import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import  { readPosts, createPost } from "../../models/services/postServices"


const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/", async(req, res) => {
        try {
            const posts = await readPosts(req);
            const response = buildResponse(req, RESPONSE_TYPES.POST_FETCH_SUCCESS, posts);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.POST_FETCH_SUCCESS, MESSAGES.POST_FETCH_FAILURE);
            res.send(response);

        }
    });

    // add post
    router.post("/post", async(req,res) => {
        try {
           const postSaved = await createPost(req);
            const response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_SUCCESS, MESSAGES.POST_SUBMISSION_SUCCESS);
            return res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_FAILURE, MESSAGES.POST_SUBMISSION_FAILURE);
            return res.send(response);
        }
    });
};

export default registerPostRouter;
