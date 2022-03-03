import _ from "lodash";
import { generate as otpGenerator } from "otp-generator";
import { createNewOTP as otpHashGenerator, verifyOTP }   from "otp-without-db";
import  { RESPONSE_CODES } from "../configs/constants"

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
    const otp = otpGenerator(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, alphabets: false });
    const otpHash = otpHashGenerator(submitterEmail, otp, otpHashKey, 5, "sha256");
    return otpHash;
}
