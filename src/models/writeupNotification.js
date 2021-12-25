import mongoose from 'mongoose';

const WriteUpNotification = new mongoose.Schema({
    "_id": {
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
    "active":{
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("WriteUpNotification", WriteUpNotification);
