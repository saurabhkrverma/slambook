import _ from "lodash";
import Collection from "../collection";
import Post from "../post";

export const readPosts = async (req) => {
    try {
        const posts = await Collection.aggregate([{
            $match: { "email": _.get(req, "user.email")}
        },{
            $lookup:{
                "from": "posts",
                "localField": "collectionId",
                "foreignField": "collectionId",
                "as": "posts"
            }},{
            $project: {
                "email": 1,
                "collectionName": 1,
                "name": 1,
                "posts": 1
            }
        }]);
        return posts
    } catch (error) {
        throw error;
    }
};

export const createPost = async (req) => {
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
        return true;
    } catch (err) {
        throw err
    }
};
