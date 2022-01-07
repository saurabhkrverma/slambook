// list of urls where authentication is not required
const whitelistUrls = {
    "/request": true,
    "/request/": true,
    "/auth/login": true,
    "/auth/login/": true,
    "/api/user": true,
    "/api/user/": true,
    "/api/initialiseApp": true,
    "/api/initialiseApp/":true,
    "/favicon.ico":true,
    "/favicon.ico/":true
};

export default whitelistUrls;
