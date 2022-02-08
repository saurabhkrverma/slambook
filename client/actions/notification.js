import {hideLoader, showLoader} from "./app";
import { getNotifications } from "../utils/apiUtils"
import { ACTIONS } from "../config/constants"
import _ from "lodash";


const _getNotifications = (data) => {
    return {
        type: ACTIONS.LOAD_NOTIFICATIONS,
        data
    }
}

const _receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})


export const getNotificationsAction = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await getNotifications();
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
