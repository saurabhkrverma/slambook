import mongoose from "mongoose";

const WriteUp = new mongoose.Schema( {
    _id: {
        "requester":{
            type: String,
            required: [true, 'This is a mandatory field']
        },
        "author": {
            type: String,
            required: [true, 'This is a mandatory field']
        }
    },
    "requester":{
        type: String,
        required: [true, 'This is a mandatory field']
    },
    "author": {
        type: String,
        required: [true, 'This is a mandatory field']
    },
    "message" : {
        type: String,
        required: [true, 'This is a mandatory field']
    }
});

module.exports = mongoose.model("WriteUp", WriteUp);
