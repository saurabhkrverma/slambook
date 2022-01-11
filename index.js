import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import {v4 as uuid} from 'uuid';
import { authentication } from './src/middlewares';
import routes from './src/routes';
const app = express();
import path from "path";

export const DIST_DIR = path.join(__dirname, "./dist");

const mongoConnectionURI = `mongodb://localhost:27017/slambook`
// const mongoConnectionURI = `mongodb+srv://sauraverma:Dushyant%407@cluster0.ppbaa.mongodb.net/slambook?retryWrites=true&w=majority`;

// const mongoConnectionURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ppbaa.mongodb.net/slambook?retryWrites=true&w=majority`;

// middleware to use the json parser
app.use(express.json());
// middleware to serve static content like html css
app.use(express.static(DIST_DIR));
// middleware to manage session
app.use(session({
    genid:(req) => {
        return uuid()
    },
    store: MongoStore.create({
        mongoUrl: mongoConnectionURI
    }),
    secret: 'moina',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(30*60*1000)
    },
}));
// enabling secure cookie for heroku
app.set('trust proxy', 1);
// initialise passport
app.use(passport.initialize());
// ask passport to use the session object
app.use(passport.session());
// authenticate incoming requests
app.use(authentication.authenticateRequest);
// middleware to register routes
app.use("/", routes);


try {
    mongoose
        .connect(mongoConnectionURI, {useNewUrlParser: true})
        .then(()=>{
            console.log("DB connection made successfully");
            app.listen((process.env.PORT || 5000), () =>{
                console.log("server is running on port 5000")
            })
        });
} catch (error) {
    console.log(error);
}







