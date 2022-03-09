import _ from "lodash";
import  { RESPONSE_CODES } from "../configs/constants";
import * as dotenv from 'dotenv';
import { generateOTPAndHash, sendOTPViaEmail, verifySubmittedOTP } from "./otpRelatedUtils";
dotenv.config();

export const shouldSavePost = (req) => {
    if(req.user) {
        return RESPONSE_CODES.POST.SUBMISSION.VALIDATED;
    } else {
        const submittedOTP = _.get(req, "body.otpValue");
        if(submittedOTP) {
            const submitterEmail = _.get(req, "body.submitterEmail", "").toLowerCase();
            const submittedOTP = _.get(req, "body.otpValue", "").toLowerCase();
            const otpHash = _.get(req, "body.otpHash", "").toLowerCase();
            const validOTP =  verifySubmittedOTP(submitterEmail, submittedOTP, otpHash);
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

export const generateOTPAndSendMail = (req) => {
    const submitterEmail = _.get(req, "body.submitterEmail", "").toLowerCase();
    const submitterName = _.get(req, "body.submitterName", "").toLowerCase();
    const { otp,otpHash } = generateOTPAndHash(submitterEmail, submitterName);
    console.log("otp", otp);
    // no need to wait for email to be sent
    // sendOTPViaEmail(submitterEmail, submitterName, otp);
    return otpHash;
}
