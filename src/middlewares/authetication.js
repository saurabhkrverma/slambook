import config from '../configs';

const authenticateRequest = (req, res, next) => {
    // URLs for which loginable account is not needed
    if(config.whitelistUrls[req.url]){
        next();
    } else if(req.isAuthenticated()){
        next();
    } else {
        return res.status(401).send();
    }
}

module.exports = {
    authenticateRequest
}
