// list of urls where authentication is not required
const whitelistUrls = {
    "/auth/login": true,
    "/auth/login/": true,
    "/api/user": true,
    "/api/user/": true,
    "/api/initialiseApp": true,
    "/api/initialiseApp/":true
};

export default whitelistUrls;
