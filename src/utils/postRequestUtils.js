import _ from "lodash";

export const shouldSavePost = (req) => {
    if(req.user) {
        return true;
    } else {
        const submittedOTP = _.get(req, "body.otpValue");
        if(submittedOTP) {
            // todo :verify the submitted otp against otp stored in db
            return true;
        }
    }
    // check for otp if ots present otherwise ask for it
    return false;
}
