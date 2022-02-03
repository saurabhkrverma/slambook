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
            }
        }]);
        return posts
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

export const createPost = async (req) => {
    try {
        const collectionId = (req.body.collectionId);
        const questionnaire = (req.body.questionnaire);
        const submitterName = (req.body.submitterName);
        const submitterEmail = (req.body.submitterEmail);
        const post = new Post({
            collectionId,
            questionnaire,
            submitterName,
            submitterEmail
        });
        await post.save();
        return true;
    } catch (err) {
        throw err
    }
};
