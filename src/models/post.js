import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    "_id": {
        "email":{
            type: String,
            required: [true, 'email is required'],
            validate: {
                validator: function(email) {
                    return /^\S+@\S+\.\S+/.test(email);
                },
                message: props => `${props.value} is not a valid email id!`
            }
        },
        "collectionId": {
            type: String,
            required: [true, 'This is a mandatory field'],
            unique: true
        },
    },
    "email":{
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function(email) {
                return /^\S+@\S+\.\S+/.test(email);
            },
            message: props => `${props.value} is not a valid email id!`
        }
    },
    "collectionId": {
        type: String,
        required: [true, 'This is a mandatory field'],
        unique: true
    }
})

module.exports = mongoose.model("Post", Post);
