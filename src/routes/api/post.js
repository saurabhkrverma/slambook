import _ from "lodash";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import Post from "../../models/post";
import Collection from "../../models/collection";

const registerPostRouter = (router) => {

    // get all write-ups
    router.get("/post/", async(req, res) => {
        try {
            console.log("aa bhi raha hai yahan kya ?");

            const test = await Collection.aggregate([{
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
            // const test = await Collection.aggregate.lookup({
            //     from: Post, //or Races.collection.name
            //     localField: "collectionId",
            //     foreignField: "collectionId",
            // });

            // const collections = await Collection.find({
            //     "email": _.get(req,"user.email")
            // }, {collectionId: 1});

            console.log("check collections and fetch collection ID", JSON.stringify(test));
            // console.log("check the actual posts collected", posts);
            res.send(test);
        } catch (err) {
            console.log("error haan", err);
            res.send(err);
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
            // const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_SUCCESS, MESSAGES.REQUEST_SUBMISSION_SUCCESS);
            return res.send("done");
        } catch (error) {
            console.log("error aa rahi hai", error);
            // const response = buildResponse(req, RESPONSE_TYPES.REQUEST_SUBMISSION_FAILURE, error);
            return res.send(error);
        }
        res.send(response);
    });
};

export default registerPostRouter;
