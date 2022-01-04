import config from '../configs';

const authenticateRequest = (req, res, next) => {
    // URLs for which loginable account is not needed
    if(config.whitelistUrls[req.url]){
        next();
    } else if(req.isAuthenticated()){
        next();
    } else {
        const regexp = /^\/api/i;
        if(regexp.test(req.url)){
            return res.status(401).send();
        } else {
            return res.redirect("/");
        }
    }
}

module.exports = {
    authenticateRequest
}
