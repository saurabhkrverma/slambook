export const shouldSavePost = (req) => {
    if(req.user) {
        return true;
    }
    // ask for otp
    return true;
}
