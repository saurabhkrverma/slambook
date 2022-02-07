import _ from "lodash";
import Notification from "../notification";


export const readNotifications = async (req, _user) => {
    try {
        const _email = _.get(req, "params.email", _.get(_user, "email", "")).toLowerCase();
        const notifications = await Notification.find({email: _email});
        return notifications;
    } catch (err) {
        throw err;
    }

}
