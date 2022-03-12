import _ from "lodash";
import Collection from "../collection";
import {v4 as uuid} from "uuid";

const _filterCollectionWithUserDetails = (collection={}) => {
    const filteredCollection = {
        email: _.get(collection,'email'),
        collectionName: _.get(collection,'collectionName'),
        collectionId: _.get(collection,'collectionId'),
        questionnaire: _.get(collection,'questionnaire'),
        user: {
            firstName: _.get(collection,"user[0].firstName"),
            lastName: _.get(collection,"user[0].lastName")
        }
    }
    return filteredCollection;
};

export const readCollectionWithUserDetails = async (req) => {
    try {
        let filteredCollection = []
        const collection = await Collection.aggregate([{
            $match: { "collectionId": _.get(req,"params.postId")}
        },{
            $lookup:{
                "from": "users",
                "localField": "email",
                "foreignField": "email",
                "as": "user"
            }
        }]);

        if(collection && collection.length > 0){
            filteredCollection = _filterCollectionWithUserDetails(collection[0]);
        }

        return filteredCollection;
    } catch (err) {
        throw err;
    }

}

export const readCollection = async (req) => {
    try {
        const collection = await Collection.findOne({
            "collectionId": _.get(req,"body.collectionId")
        });
        return collection;
    } catch (err) {
        throw err;
    }

}

export const readCollections = async (req) => {
    try {
        const collections = await Collection.find({
            "email": _.get(req,"user.email")
        }).sort({
            "createdOn": -1
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
            collectionName: _.get(req,"body.collectionName"),
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
