import mongoose from 'mongoose';

const CollectionForm = new mongoose.Schema({
    "question":{
        type: String,
        required: [true, 'This is a mandatory field']
    },
    "answer":{
        type: String,
        required: [true, 'This is a mandatory field']
    },
},{ _id : false });

const Post = new mongoose.Schema({
    "collectionId": {
        type: String,
        required: [true, 'This is a mandatory field']
    },
    "questionnaire" : {
        type: [CollectionForm],
        required: [true, 'This is a mandatory field']
    },
    "name":{
        type: String,
        required: [true, 'This is a mandatory field']
    }
})

module.exports = mongoose.model("Post", Post);
