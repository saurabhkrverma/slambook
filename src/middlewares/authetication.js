import config from '../configs';

const authenticateRequest = (req, res, next) => {
    // URLs for which loginable account is not needed
    if(config.whitelistUrls[req.url]){
        next();
    } else if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = {
    authenticateRequest
}