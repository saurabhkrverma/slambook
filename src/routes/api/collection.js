import _ from "lodash";
import {v4 as uuid} from 'uuid';
import Collection from "../../models/collection";
import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"

const registerCollectionRouter = (router) => {

    // get all write-ups
    router.get("/collection/", async(req, res) => {
        try {
            const collections = await Collection.find({
                "email": _.get(req,"user.email")
            });
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_SUCCESS, collections);
            res.send(response);
        } catch (err) {
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_FETCH_FAILURE, err);
            res.send(response);
        }
    });

    // add collection
    router.post("/collection", async(req,res) => {
        try {
            const collection = new Collection({
                email: _.get(req,"body.email") || _.get(req,"user.email"),
                name: _.get(req,"body.name"),
                collectionId: uuid(),
                questionnaire: _.get(req,"body.questionnaire")
            });
            await collection.save();
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_ADDITION_SUCCESS, MESSAGES.COLLECTION_ADDITION_SUCCESS);
            res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_ADDITION_FAILURE, MESSAGES.COLLECTION_ADDITION_FAILURE);
            res.send(response);
        }

    });

    router.patch("/collection", async(req,res) => {
        try {
            const collectionId = _.get(req,"body.collectionId");
            const collection = await Collection.findOne({
                "collectionId": collectionId
            });
            collection.questionnaire = _.get(req,"body.questionnaire", collection.questionnaire);
            await collection.save();
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_PATCH_SUCCESS, MESSAGES.COLLECTION_PATCH_SUCCESS);
            res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_PATCH_FAILURE, MESSAGES.COLLECTION_PATCH_FAILURE);
            res.send(response);
        }

    });

    // delete collection
    router.delete("/collection/:collectionId", async(req,res)=>{
        try{
            const collection = await Collection.deleteOne({
                "collectionId": _.get(req,"params.collectionId")
            });
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_DELETE_SUCCESS, MESSAGES.COLLECTION_DELETE_SUCCESS);
            res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.COLLECTION_DELETE_SUCCESS, MESSAGES.COLLECTION_DELETE_SUCCESS);
            res.send(response);
        }
    });
};

export default registerCollectionRouter;
