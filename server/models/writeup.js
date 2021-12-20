import moongoose from "mongoose";

const WriteUp = new moongoose.Schema( {
    _id: {
        "user":{
            type: String,
            required: [true, 'This is a mandatory field']
        },
        "author": {
            type: String,
            required: [true, 'This is a mandatory field']
        }
    },
    "user":{
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

module.exports = moongoose.model("WriteUp", WriteUp);
