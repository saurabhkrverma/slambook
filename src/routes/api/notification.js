import {readNotifications} from "../../models/services/notificationServices";

const registerNotificationRouter = (router) => {

    // get user
    router.get("/notifications", async(req, res) => {
        try {
            const notifications = await readNotifications(req);
            res.send(notifications);
        } catch (error) {
            res.send(error);
        }

    });
};

export default registerNotificationRouter;
