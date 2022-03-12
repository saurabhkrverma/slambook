import {generate as otpGenerator} from "otp-generator";
import {createNewOTP as otpHashGenerator, verifyOTP} from "otp-without-db";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { constructEmailTransporter } from './commonUtils';
import * as dotenv from 'dotenv';
dotenv.config();

export const verifySubmittedOTP = (email, otp, otpHash) => {
    const otpHashKey = "slambook";
    const validOTP = verifyOTP(email, otp, otpHash, otpHashKey,"sha256");
    return validOTP;
}

export const generateOTPAndHash = (email, name) => {
    const otpHashKey = "slambook";
    const otp = otpGenerator(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, alphabets: false });
    const otpHash = otpHashGenerator(email, otp, otpHashKey, 5, "sha256");
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
        const mailOptions = {
            from: process.env.GOOGLE_CLIENT_ID,
            to: email,
            subject: 'Your OTP for slambook post',
            text: `Hi ${name}, your otp for slambook's post submission is ${otp}`,
            html: htmlToSend
        };
        const transporter = await constructEmailTransporter();
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
