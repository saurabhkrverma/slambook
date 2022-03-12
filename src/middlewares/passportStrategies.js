//serialize user
import * as dotenv from 'dotenv';
dotenv.config();
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
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
            clientID: "4829763920406236",
            clientSecret: "7bdf5926b713319f2e35d768bcbf601d",
            callbackURL: "http://localhost:5000/auth/facebook/callback",
            profile: ['id', 'displayName', 'name', 'profileUrl', 'email']
        }, async (accessToken, refreshToken, profile, done) => {
            console.log("check this:", profile);
            // FD data
        // {
        //     id: '5227572593920381',
        //         username: undefined,
        //     displayName: 'Saurabh Verma',
        //     name: {
        //     familyName: undefined,
        //         givenName: undefined,
        //         middleName: undefined
        // },
        //     gender: undefined,
        //         profileUrl: undefined,
        //     provider: 'facebook',
        //     _raw: '{"name":"Saurabh Verma","id":"5227572593920381"}',
        //     _json: { name: 'Saurabh Verma', id: '5227572593920381' }
        // }

        // return done(null, profile);
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
