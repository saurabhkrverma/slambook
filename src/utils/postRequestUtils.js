export const shouldSavePost = (req) => {
    if(req.user) {
        return true;
    }
    // check for otp if ots present otherwise ask for it
    return false;
}
