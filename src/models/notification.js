import mongoose from 'mongoose';

const Notification = new mongoose.Schema({
    "email": {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: function(email) {
                return /^\S+@\S+\.\S+/.test(email);
            },
            message: props => `${props.value} is not a valid email id!`
        }
    }, "collectionId": {
        type: String,
        required: [true, 'This is a mandatory field']
    }, "submitterEmail": {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function(email) {
                return /^\S+@\S+\.\S+/.test(email);
            },
            message: props => `${props.value} is not a valid email id!`
        }
    }, "submitterName":{
        type: String
    }
});

module.exports = mongoose.model("Notification", Notification);
