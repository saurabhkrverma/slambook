import _ from "lodash";
import {v4 as uuid} from 'uuid';
import Collection from "../../models/collection";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"

const registerQuestionnaireRouter = (router) => {

    // get all write-ups
    router.get("/collection/", async(req, res) => {
        try {
            const collection = await Collection.find({
                "email": _.get(req,"user.email")
            });
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_SUCCESS, collection);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_FAILURE, err);
            res.send(response);
        }
    });

    // get write-ups received
    // router.get("/collection/requested/:requester", async(req, res) => {
    //     try {
    //         // const collection = await collection.find({"requester": req.params.requester});
    //         collection.aggregate([{
    //                 $match: {
    //                     "requester": req.params.requester
    //                 }
    //             }, {
    //                 $lookup: {
    //                     "from": "users",
    //                     "localField": "author",
    //                     "foreignField": "email",
    //                     "as": "authorDetails"
    //                 }
    //             }
    //         ]).exec(function(err, result){
    //             if(err) throw err;
    //             res.send(result);
    //         })
    //         // res.send(collection);
    //     } catch (error) {
    //         res.send(error);
    //     }
    //
    // });

    // get write-ups posted
    // router.get("/collection/authored/:author", async(req, res) => {
    //     try {
    //         // const collection = await collection.find({"author": req.params.author});
    //         collection.aggregate([{
    //             $match: {
    //                 "author": req.params.author
    //             }
    //         }, {
    //             $lookup: {
    //                 "from": "users",
    //                 "localField": "requester",
    //                 "foreignField": "email",
    //                 "as": "requesterDetails"
    //             }
    //         }
    //         ]).exec(function(err, result){
    //             if(err) throw err;
    //             res.send(result);
    //         })
    //         // res.send(collection);
    //     } catch (error) {
    //         res.send(error);
    //     }
    //
    // });

    // add collection
    router.post("/collection", async(req,res) => {
        try {
            const collection = new Collection({
                email: _.get(req,"body.email") || _.get(req,"user.email"),
                name: _.get(req,"body.name"),
                collectionId: uuid(),
                form: _.get(req,"body.form")
            });
            await collection.save();
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_ADDITION_SUCCESS, MESSAGES.COLLECTION_ADDITION_SUCCESS);
            res.send(response);
        } catch (error) {
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_ADDITION_FAILURE, MESSAGES.COLLECTION_ADDITION_FAILURE);
            res.send(response);
        }

    });

    // delete collection
    router.delete("/collection/:collectionId", async(req,res)=>{
        try{
            const collection = await Collection.deleteOne({
                "collectionId": _.get(req,"params.collectionId")
            });
            res.status(204).send();
        } catch (error) {

            res.send(error);
        }
    });
};

export default registerQuestionnaireRouter;
