import User from "../models/user";
import {MESSAGES, RESPONSE_TYPES} from "../configs/constants";
import bcrypt from "bcrypt";
import _ from "lodash";
import {createGoogleUser, readUser} from "../models/services/userServices";
import {sendWelcomeEmail} from "./userRequestUtils";

export const localStrategyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({email: username.toLowerCase()});
        if (user === null) {
            const loginError = new Error(MESSAGES.USER_LOGIN_FAILURE_INCORRECT_EMAIL, {cause: RESPONSE_TYPES.USER_LOGIN_FAILURE});
            done(loginError);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            done(null, user)
        } else {
            const loginError = new Error(MESSAGES.USER_LOGIN_FAILURE_INCORRECT_PASSWORD, {cause: RESPONSE_TYPES.USER_LOGIN_FAILURE});
            done(loginError);
        }
    } catch (err) {
        done({"error": err.message});
    }
};


 export const googleStrategyCallback = async (accessToken, refreshToken, profile, done) => {
     try {
         // user details
         const user = {
             email: _.get(profile, "emails[0].value"),
             firstName: _.get(profile, "name.givenName"),
             lastName: _.get(profile, "name.familyName"),
             profilePic: _.get(profile, "photos[0].value"),
             source: "google"
         };

         const currentUser = await readUser({}, user);

         if (currentUser && currentUser.source !== "google") {
             //return error
             return done(null, false, { message: `You have previously signed up with a different signin method` });
         }

         if (!currentUser) {
             const newUser = await createGoogleUser(user);
             sendWelcomeEmail(user);
             return done(null, newUser);
         } else {
             return done(null, currentUser);
         }
     } catch (err) {
         return done(err, null);
     }
 }


 export const facebookStrategyCallback = async(accessToken, refreshToken, profile, done) => {
     /*
         Response
            {
                id: '736145830691688',
                username: undefined,
                displayName: 'Sanjana Singh',
                name: {
                    familyName: undefined,
                    givenName: undefined,
                    middleName: undefined
                },
                gender: undefined,
                profileUrl: undefined,
                provider: 'facebook',
                _raw: '{"name":"Sanjana Singh","id":"736145830691688"}',
                _json: { name: 'Sanjana Singh', id: '736145830691688' }
            }
        */
     try {
         const user = {
             email: `${profile.id}@fb.com`,
             firstName: profile.displayName,
             lastName: _.get(profile, "name.familyName"),
             profilePic: _.get(profile, "profileUrl"),
             source: "facebook"
         };

         const currentUser = await readUser({}, user);

         if (currentUser && currentUser.source !== "facebook") {
             //todo : send response
             return done(null, false, { message: `You have previously signed up with a different signin method` });
         }

         if (!currentUser) {
             const newUser = await createGoogleUser(user);
             sendWelcomeEmail(user);
             return done(null, newUser);
         } else {
             return done(null, currentUser);
         }
     } catch (err) {
         return done(err, null);
     }
 }
