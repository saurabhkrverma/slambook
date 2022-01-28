import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    "password": {type: String},
    "firstName": {type: String},
    "lastName": {type: String},
    "profilePic": {type: String},
    "source": {type: String}
});

User.methods.hashPassword = (password) => {
    // returns promise
    return bcrypt.hash(password,1);
}

User.methods.comparePassword = (password, hash) => {
    // returns promise
    return bcrypt.compare(password, hash);
}

module.exports = mongoose.model("User", User);
