import _ from "lodash";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import Post from "../../models/post";

const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/", async(req, res) => {
        try {
            const post = await Post.find({
                "email": _.get(req,"user.email")
            });
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_SUCCESS, post);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_FAILURE, err);
            res.send(response);
        }
    });

    // add post
    router.post("/post", async(req,res) => {
        try {
            const email = _.get(req,"user.email");
            const collectionId = (req.body.collectionId || _.get(req,'session.collectionId'));
            console.log("collectionId fetched : ", collectionId);
            const post = new Post({
                _id: {
                    email: email,
                    collectionId: collectionId
                },
                email: email,
                collectionId: collectionId
            });
            await post.save();
            const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_SUCCESS, MESSAGES.REQUEST_SUBMISSION_SUCCESS);
            return response
        } catch (error) {
            const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_FAILURE, error);
            return response
        }
        res.send(response);
    });
};

export default registerPostRouter;
