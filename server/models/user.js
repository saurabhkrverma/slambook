import mongoose from 'mongoose';

const User = mongoose.Schema({
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
    },
    "name": {type: String}
});

module.exports = mongoose.model("User", User);
