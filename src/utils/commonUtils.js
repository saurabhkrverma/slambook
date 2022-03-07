import {google} from "googleapis";
import * as nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config();

export const constructEmailTransporter = async () => {
    const CLIENT_EMAIL = process.env.GOOGLE_EMAIL; //your email from where you'll be sending emails to users
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Client ID generated on Google console cloud
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; // Client SECRET generated on Google console cloud
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN; // The refreshToken we got from the the OAuth2 playground
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // The OAuth2 server (playground)

    const OAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    );

    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Generate the accessToken on the fly
    const accessToken = await OAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        tls:{
            rejectUnauthorized:false
        },
        auth: {
            type: 'OAuth2',
            user: CLIENT_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });

    return transporter;
}
