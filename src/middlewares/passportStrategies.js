//serialize user
import * as dotenv from 'dotenv';
dotenv.config();
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/user";
import { localStrategyCallback, googleStrategyCallback, facebookStrategyCallback } from "../utils/loginRequestUtils";

const initialisePassportStrategies = (req, res, next) => {

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

// deserialize user
    passport.deserializeUser(async (id, done)=>{
        try {
            const user = await User.findOne({_id: id});
            done(null, user);
        } catch (err) {
            done (err, null);
        }
    });

// configure passport to use the facebook strategy
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_SECRET,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done) => {
            return facebookStrategyCallback(accessToken, refreshToken, profile, done);
        }
    ));

// configure passport to use the google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },async (accessToken, refreshToken, profile, done) => {
        return googleStrategyCallback(accessToken, refreshToken, profile, done);
    }));

// configure passport to use a local strategy
    passport.use(new LocalStrategy(  {usernameField: 'email', passwordField: "password" }, async function (username, password, done) {
        return localStrategyCallback(username, password, done);
    }));

    next();
}

module.exports = {
    initialisePassportStrategies
}
