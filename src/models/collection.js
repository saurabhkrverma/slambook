import mongoose from "mongoose";

const Collection = new mongoose.Schema( {
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
    "name":{
        type: String,
        required: [true, 'This is a mandatory field']
    },
    "collectionId": {
        type: String,
        required: [true, 'This is a mandatory field'],
        unique: true
    },
    "form" : {
        type: Array,
        required: [true, 'This is a mandatory field']
    }
});

module.exports = mongoose.model("Collection", Collection);
