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
    "password": {
        type: String,
        required: [true, 'password is required']
    },
    "name": {type: String}
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
