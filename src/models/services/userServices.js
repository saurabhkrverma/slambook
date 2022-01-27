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

export const readUser = async (req, _user) => {
    try {
        const _email = _.get(req, "params.email", _.get(_user, "email", "")).toLowerCase();
        const user = await User.findOne({email: _email});
        return user;
    } catch (err) {
        throw err;
    }

}

export const createGoogleUser = async (_user) => {
    try {
        console.log("this is the user passed to create new : ", _user);
        const user = new User(_user);

        await user.save();

        return user;
    } catch(err) {
        console.log("this is the error : ", err);
        throw err;
    }
}

export const createUser = async (req) => {
    try {
        const email = req.body.email ? req.body.email.toLowerCase() : undefined;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const source = "organic";
        const user = new User({
            email,
            firstName,
            lastName,
            source
        });
        const hashedPassword = await user.hashPassword(req.body.password);
        user.password = hashedPassword;
        await user.save();
        return true;
    } catch(err) {
        console.log("error : ", err);
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

        if(req.body.password) {
            const hashedPassword = await user.hashPassword(req.body.password);
            user.password = hashedPassword;
        }

        await user.save();
        return true;
    } catch (err) {
        throw err;
    }
}

export const updatePassword = async (req) => {
    try {
        const email = req.body.email ? req.body.email.toLowerCase() : undefined;
        const password = req.body.password;
        const user = await User.findOne({email: email})
        if(!user) {
            throw new Error("email not registered");
        }

        if(req.body.password) {
            const hashedPassword = await user.hashPassword(password);
            user.password = hashedPassword;
        }

        await user.save();

        return true;
    } catch (err) {
        console.log(err)
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
