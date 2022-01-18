import _ from "lodash";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import Post from "../../models/post";
import Collection from "../../models/collection";

const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/", async(req, res) => {
        try {
            const posts = await Collection.aggregate([{
                $match: { "email": _.get(req,"user.email")}
                },{
                $lookup:{
                    "from": "posts",
                    "localField": "collectionId",
                    "foreignField": "collectionId",
                    "as": "posts"
                }},{
                $project: {
                    "email": 1,
                    "name": 1,
                    "posts": 1
                }
            }]);
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
            const collectionId = (req.body.collectionId);
            const questionnaire = (req.body.questionnaire);
            const name = (req.body.name);
            const post = new Post({
                collectionId,
                questionnaire,
                name
            });
            await post.save();
            const response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_SUCCESS, MESSAGES.POST_SUBMISSION_SUCCESS);
            return res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.POST_SUBMISSION_FAILURE, MESSAGES.POST_SUBMISSION_FAILURE);
            return res.send(response);
        }
        res.send(response);
    });
};

export default registerPostRouter;
