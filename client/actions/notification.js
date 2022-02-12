import {hideLoader, showLoader} from "./app";
import { getNotificationsCount, getNotifications, clearNotification, clearAllNotifications } from "../utils/apiUtils"
import { ACTIONS } from "../config/constants"
import _ from "lodash";


const _getNotificationsCount = (data) => {
    return {
        type: ACTIONS.LOAD_NOTIFICATIONS,
        data
    }
}

const _getNotifications = (data) => {
    return {
        type: ACTIONS.LOAD_NOTIFICATIONS,
        data
    }
}

const _clearNotification = (data) => {
    return {
        type: ACTIONS.CLEAR_NOTIFICATION,
        data
    }
}


const _receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})

export const getNotificationsCountAction = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await getNotificationsCount();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_getNotifications(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}


export const getNotificationsAction = () => async (dispatch) => {
    try {
        const response = await getNotifications();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_getNotificationsCount(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    }
}

export const clearNotificationAction = (notification) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await clearNotification(notification);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            dispatch(getNotificationsAction());
            return dispatch(_clearNotification(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}

export const clearAllNotificationsAction = () => async(dispatch) => {
    try {
        dispatch(showLoader());
        const response = await clearAllNotifications();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            dispatch(getNotificationsAction());
            return dispatch(_clearNotification(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}
