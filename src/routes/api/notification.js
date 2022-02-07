import { readNotifications, createNotification, deleteNotification, deleteAllNotification } from "../../models/services/notificationServices";

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

    router.delete("/notification/all", async(req, res) => {
        try{
            const notificationsDeleted = await deleteAllNotification(req);
            res.send(notificationsDeleted);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    })

    router.delete("/notification", async(req, res) => {
        try{
            const notificationsDeleted = await deleteNotification(req);
            res.send(notificationsDeleted);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    })
};

export default registerNotificationRouter;
