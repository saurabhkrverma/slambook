import buildResponse from '../../utils/responseBuilder';
import { MESSAGES } from '../../configs/constants'
import { RESPONSE_TYPES } from '../../configs/constants';

const registerLogoutRouter = (router) => {
    router.get("/logout", async(req, res, next) => {
        try{
            req.logout();
            res.status(200).clearCookie('connect.sid');
            req.session.destroy(function (err) {
                res.clearCookie('connect.sid');
                const response = buildResponse(req, RESPONSE_TYPES.USER_LOGOUT_SUCCESS, MESSAGES.USER_LOGOUT_SUCCESS);
                return res.send(response);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

export default registerLogoutRouter;
