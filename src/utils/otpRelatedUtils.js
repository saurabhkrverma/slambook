import {generate as otpGenerator} from "otp-generator";
import {createNewOTP as otpHashGenerator, verifyOTP} from "otp-without-db";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import {google} from "googleapis";
import * as nodemailer from "nodemailer";

export const verifySubmittedOTP = (email, otp, otpHash) => {
    const otpHashKey = "slambook";
    const validOTP = verifyOTP(email, otp, otpHash, otpHashKey,"sha256");
    return validOTP;
}

export const generateOTPAndHash = (email, name) => {
    const otpHashKey = "slambook";
    const otp = otpGenerator(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, alphabets: false });
    const otpHash = otpHashGenerator(email, otp, otpHashKey, 5, "sha256");
    console.log("hash created:", otpHash)
    return {
        otp,
        otpHash
    };
}

export const sendOTPViaEmail = async (email, name, otp) => {
    try {
        const filePath = path.join(__dirname, '../templates/otpMailTemplate.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            username: name,
            otp: otp
        };
        const htmlToSend = template(replacements);

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

        const mailOptions = {
            from: CLIENT_EMAIL,
            to: email,
            subject: 'Your OTP for slambook post',
            text: `Hi ${name}, your otp for slambook's post submission is ${otp}`,
            html: htmlToSend
        };
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
