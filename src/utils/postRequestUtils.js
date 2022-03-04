import _ from "lodash";
import { generate as otpGenerator } from "otp-generator";
import { createNewOTP as otpHashGenerator, verifyOTP }   from "otp-without-db";
import  { RESPONSE_CODES } from "../configs/constants";
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

const _verifyOTP = (req) => {
    const otpHashKey = "slambook";
    const submitterEmail = _.get(req, "body.submitterEmail", "").toLowerCase();
    const submittedOTP = _.get(req, "body.otpValue", "").toLowerCase();
    const otpHash = _.get(req, "body.otpHash", "").toLowerCase();
    const validOTP = verifyOTP(submitterEmail,submittedOTP,otpHash, otpHashKey,"sha256");
    return validOTP;
}

export const shouldSavePost = (req) => {
    if(req.user) {
        return RESPONSE_CODES.POST.SUBMISSION.VALIDATED;
    } else {
        const submittedOTP = _.get(req, "body.otpValue");
        if(submittedOTP) {
            const validOTP =  _verifyOTP(req);
            if(validOTP) {
                return RESPONSE_CODES.POST.SUBMISSION.VALIDATED;
            } else {
                return RESPONSE_CODES.POST.SUBMISSION.INVALID_OTP
            }
        } else {
            return RESPONSE_CODES.POST.SUBMISSION.REQUEST_OTP
        }
    }
}

export const generateOTPHash = (req) => {
    const otpHashKey = "slambook";
    const submitterEmail = _.get(req, "body.submitterEmail", "").toLowerCase();
    const submitterName = _.get(req, "body.submitterName", "").toLowerCase();
    const otp = otpGenerator(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, alphabets: false });
    const otpHash = otpHashGenerator(submitterEmail, otp, otpHashKey, 5, "sha256");
    sendOTPViaEmail(submitterEmail, submitterName, otp);
    return otpHash;
}

export const sendOTPViaEmail = (email, name, otp) => {
    const filePath = path.join(__dirname, '../templates/otpMailTemplate.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: name,
        otp: otp
    };
    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjuprinceofpersia@gmail.com',
            pass: 'dushyant_7'
        }
    });

    const mailOptions = {
        from: 'sanjuprinceofpersia@gmail.com',
        to: email,
        subject: 'Your OTP for slambook post',
        text: `Hi ${name}, your otp for slambook's post submission is ${otp}`,
        html: htmlToSend
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            //todo : if email couldn't be sent, send an error back to user
            console.log("mail couldn't be sent: ",error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
