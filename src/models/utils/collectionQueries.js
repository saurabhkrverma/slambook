import _ from "lodash";
import Collection from "../collection";
import {v4 as uuid} from "uuid";

export const readCollections = async (req) => {
    try {
        const collections = await Collection.find({
            "email": _.get(req,"user.email")
        });
        return collections
    } catch (err) {
        throw err;
    }

}

export const createCollection = async (req) => {
    try {
        const collection = new Collection({
            email: _.get(req,"body.email") || _.get(req,"user.email"),
            name: _.get(req,"body.name"),
            collectionId: uuid(),
            questionnaire: _.get(req,"body.questionnaire")
        });
        await collection.save();
        return true;
    } catch(err) {
        throw err;
    }
}

export const updateCollection = async (req) => {
    try {
        const collectionId = _.get(req,"body.collectionId");
        const collection = await Collection.findOne({
            "collectionId": collectionId
        });
        collection.questionnaire = _.get(req,"body.questionnaire", collection.questionnaire);
        await collection.save();
        return true;
    } catch (err) {
        throw err;
    }
}

export const deleteCollection = async (req) => {
    try {
        const collection = await Collection.deleteOne({
            "collectionId": _.get(req,"params.collectionId")
        });
        return true;
    } catch (err) {
        throw err;
    }
}
