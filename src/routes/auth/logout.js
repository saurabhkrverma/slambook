
const registerLogoutRouter = (router) => {
    router.get("/logout", async(req, res, next) => {
        try{
            req.logout();
            res.status(200).clearCookie('connect.sid');
            req.session.destroy(function (err) {
                res.clearCookie('connect.sid');
                res.redirect('/')
            });
        } catch (error) {
            res.send(error);
        }
    });
}

export default registerLogoutRouter;
