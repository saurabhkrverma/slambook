import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import  { readPosts, createPost, deletePost } from "../../models/services/postServices"


const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/", async(req, res) => {
        try {
            const posts = await readPosts(req);
            const response = buildResponse(req, RESPONSE_TYPES.POST_FETCH_SUCCESS, posts);
            res.send(response);
        } catch (err) {
            console.log(err);
            const response = buildResponse(req, RESPONSE_TYPES.POST_FETCH_FAILURE, MESSAGES.POST_FETCH_FAILURE);
            res.send(response);

        }
    });

    // delete post
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

    // delete post
    router.delete("/post", async(req,res) => {
        try {
            const postDeleted = await deletePost(req);
            const response = buildResponse(req, RESPONSE_TYPES.POST_DELETION_SUCCESS, MESSAGES.POST_DELETION_SUCCESS);
            return res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.POST_DELETION_FAILURE, MESSAGES.POST_DELETION_FAILURE);
            return res.send(response);
        }
    });
};

export default registerPostRouter;
