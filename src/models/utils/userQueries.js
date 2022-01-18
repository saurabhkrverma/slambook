import _ from "lodash";
import User from "../user";

export const readUsers = async (req) => {
    try {
        const users = await User.find();
        return users
    } catch (err) {
        throw err;
    }

}

export const readUser = async (req) => {
    try {
        const users = await User.find({email: req.params.email});
        return users
    } catch (err) {
        throw err;
    }

}

export const createUser = async (req) => {
    try {
        const email = req.body.email ? req.body.email.toLowerCase() : undefined;
        const name = req.body.name;
        const user = new User({
            email: email,
            name: name
        });
        const hashedPassword = await user.hashPassword(req.body.password);
        user.password = hashedPassword;
        await user.save();
        return true;
    } catch(err) {
        throw err;
    }
}

export const updateUser = async (req) => {
    try {
        const email = req.params.email ? req.params.email.toLowerCase() : undefined;
        const user = await User.findOne({email: email})

        if(!user) {
            return false
        }

        if(req.body.name){
            user.name = req.body.name;
        }

        await user.save();
        return true;
    } catch (err) {
        throw err;
    }
}

export const deleteUser = async (req) => {
    try {
        const email = req.params.email ? req.params.email.toLowerCase() : undefined;
        const user = await User.deleteOne({email: email})
        return true;
    } catch (err) {
        throw err;
    }
}
