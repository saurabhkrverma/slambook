// list of urls where authentication is not required
const whitelistUrls = {
    "/auth/login": true,
    "/auth/login/": true,
    "/api/user": true,
    "/api/user/": true
};

export default whitelistUrls;
