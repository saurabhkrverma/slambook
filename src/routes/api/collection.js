import { MESSAGES, RESPONSE_TYPES } from "../../configs/constants"
import { buildResponse } from "../../utils/responseBuilder"
import {deleteCollection, readCollections, createCollection, updateCollection} from "../../models/services/collectionServices"

const registerCollectionRouter = (router) => {

    // get all write-ups
    router.get("/collection/", async(req, res) => {
        try {
            const collections = await readCollections(req);
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
            const collectionCreated = await createCollection(req);
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
            const collectionUpdated = await updateCollection(req);
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
            const collectionDeleted = await deleteCollection(req);
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
