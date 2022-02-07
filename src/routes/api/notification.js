import { readNotifications, createNotification, deleteNotification, deleteAllNotification } from "../../models/services/notificationServices";
import {buildResponse} from "../../utils/responseBuilder";
import {MESSAGES, RESPONSE_TYPES} from "../../configs/constants";

const registerNotificationRouter = (router) => {

    // get notifications
    router.get("/notification", async(req, res) => {
        try {
            const notifications = await readNotifications(req);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_FETCH_SUCCESS, notifications);
            res.send(response);
        } catch (error) {
            console.log(error);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_FETCH_FAILURE, MESSAGES.NOTIFICATION_FETCH_FAILURE);
            res.send(response);
        }
    });

    router.post("/notification", async (req, res) => {
       try {
           const notificationCreated = await createNotification(req);
           const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_ADDITION_SUCCESS, MESSAGES.NOTIFICATION_ADDITION_SUCCESS);
           res.send(response)
       } catch (err) {
           console.log(err);
           const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_ADDITION_SUCCESS, MESSAGES.NOTIFICATION_ADDITION_FAILURE);
           res.send(response)
       }
    });

    router.delete("/notification/all", async(req, res) => {
        try{
            const notificationsDeleted = await deleteAllNotification(req);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_DELETE_SUCCESS, MESSAGES.NOTIFICATION_DELETE_SUCCESS);
            res.send(response)
        } catch (err) {
            console.log(err);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_ADDITION_FAILURE, MESSAGES.NOTIFICATION_ADDITION_FAILURE);
            res.send(response);
        }
    })

    router.delete("/notification", async(req, res) => {
        try{
            const notificationsDeleted = await deleteNotification(req);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_DELETE_SUCCESS, MESSAGES.NOTIFICATION_DELETE_SUCCESS);
            res.send(response)
        } catch (err) {
            console.log(err);
            const response = buildResponse(req, RESPONSE_TYPES.NOTIFICATION_ADDITION_FAILURE, MESSAGES.NOTIFICATION_ADDITION_FAILURE);
            res.send(response);
        }
    })
};

export default registerNotificationRouter;
