import _ from "lodash";
import Notification from "../notification";


export const readNotifications = async (req) => {
    try {
        const _email = _.get(req, "user.email");
        const notifications = await Notification.find({email: _email});
        return notifications;
    } catch (err) {
        throw err;
    }
}

export const createNotification = async (req) => {
    try {
        const email = _.get(req, "user.email");
        const collectionId = _.get(req, "body.collectionId");
        const submitterEmail = _.get(req, "body.submitterEmail");
        const submitterName = _.get(req, "body.submitterName");

        const notification = new Notification({
            email,
            collectionId,
            submitterEmail,
            submitterName
        });
        await notification.save();
        return true;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const countNotifications = async (req) => {
    try {
        const _email = _.get(req, "user.email");
        const notificationsCount = await Notification.countDocuments({email: _email});
        return notificationsCount;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteNotification = async (req) => {
    try {
        const email = _.get(req, "user.email");
        const collectionId = _.get(req, "body.collectionId");
        const submitterEmail = _.get(req, "body.submitterEmail");

        const notificationDeleted = await Notification.deleteMany({
            email,
            collectionId,
            submitterEmail
        });

        return true;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteAllNotification = async (req) => {
    try {
        const email = _.get(req, "user.email");
        const notificationsDeleteCount = await Notification.remove({email: email});
        return true;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
