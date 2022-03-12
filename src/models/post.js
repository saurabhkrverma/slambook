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
    "submitterName":{
        type: String
    },
    "submitterEmail": {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function(email) {
                return /^\S+@\S+\.\S+/.test(email);
            },
            message: props => `${props.value} is not a valid email id!`
        }
    },
    "createdOn" : {
        type: Date,
        default: Date.now
    }
});

Post.index({ collectionId: 1, submitterEmail: 1}, { unique: true })

module.exports = mongoose.model("Post", Post);
