import { readNotifications, createNotification } from "../../models/services/notificationServices";

const registerNotificationRouter = (router) => {

    // get notifications
    router.get("/notification", async(req, res) => {
        try {
            const notifications = await readNotifications(req);
            res.send(notifications);
        } catch (error) {
            res.send(error);
        }
    });

    router.post("/notification", async (req, res) => {
       try {
           const notificationCreated = await createNotification(req);
           res.send(notificationCreated)
       } catch (err) {
           console.log(err);
           res.send(err);
       }
    });
};

export default registerNotificationRouter;
