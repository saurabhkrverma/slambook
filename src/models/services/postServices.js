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
        },{
            $unwind: "$posts"
        }, {
            $project: {
                "posts._id": 0,
                "posts.__v":0
            }
        }, {
            $sort: { "posts.createdOn": -1 }
        }, {
            $lookup:{
                "from": "users",
                "localField": "posts.submitterEmail",
                "foreignField": "email",
                "as": "posts.user"
            }
        }, {
            $unwind: {
                "path": "$posts.user",
                "preserveNullAndEmptyArrays": true
            }
        },{
            $group: {
                _id: {
                    "collectionId": "$collectionId"
                },
                "posts": {
                    "$push": "$posts"
                },
                "collectionId": {
                    "$first": "collectionId"
                },
                "collectionName": {
                    "$first": "$collectionName"
                }
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

export const deletePost = async (req) => {
    try {
        const collectionId = _.get(req, "body.collectionId");
        const submitterEmail = _.get(req, "body.submitterEmail");
        if(!collectionId || !submitterEmail) {
            throw new Error();
        }
        const post = await Post.deleteOne({
            collectionId,
            submitterEmail
        });
        return true;
    } catch (err) {
        throw err
    }
}
