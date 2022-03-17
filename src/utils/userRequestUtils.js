import _ from "lodash";
import {generateOTPAndHash, sendOTPViaEmail, verifySubmittedOTP} from "./otpRelatedUtils";
import {RESPONSE_CODES, RESPONSE_TYPES} from "../configs/constants";
import {constructEmailTransporter} from "./commonUtils";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

export const getUserStatus = (req) => {
    const submittedOTP = _.get(req, "body.otpValue");
    if(submittedOTP) {
        const email = _.get(req, "body.email", "").toLowerCase();
        const submittedOTP = _.get(req, "body.otpValue", "").toLowerCase();
        const otpHash = _.get(req, "body.otpHash", "").toLowerCase();
        const validOTP =  verifySubmittedOTP(email, submittedOTP, otpHash);
        if(validOTP) {
            return RESPONSE_CODES.USER.REGISTRATION.VALIDATED;
        } else {
            return RESPONSE_CODES.USER.REGISTRATION.INVALID_OTP;
        }
    } else {
        return RESPONSE_CODES.USER.REGISTRATION.REQUEST_OTP
    }
}

export const generateOTPAndSendMail = (req) => {
    const email = _.get(req, "body.email", "").toLowerCase();
    const firstName = _.get(req, "body.firstName", "guest").toLowerCase();
    const { otp,otpHash } = generateOTPAndHash(email, firstName);
    // no need to wait for email to be sent
    sendOTPViaEmail(email, firstName, otp);
    return otpHash;
}

export const sendWelcomeEmail = async (user) => {
    const email = _.get(user, "email", "").toLowerCase();
    const firstName = _.get(user, "firstName", "guest").toLowerCase();
    const filePath = path.join(__dirname, '../static/templates/welcomeEmailTemplate.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        firstName
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
        from: process.env.GOOGLE_CLIENT_ID,
        to: email,
        subject: 'welcome to slambook',
        text: `Hi ${firstName}, welcome to slambook`,
        html: htmlToSend
    };
    const transporter = await constructEmailTransporter();
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
};
