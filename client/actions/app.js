import {ACTIONS} from "../config/constants";
import {initialiseApp} from "../utils/apiUtils";
import _ from "lodash";


export const showLoader = () => {
    return {
        type: ACTIONS.SHOW_LOADER,
        data : {
            showLoader: true
        }
    }
}

export const hideLoader = () => {
    return {
        type: ACTIONS.HIDE_LOADER,
        data: {
            showLoader: false
        }
    }
}

export const _initializeApp = (data) => {
    return {
        type: ACTIONS.INITIALIZE_APP,
        data
    }
}

const _receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})

export const initializeAppAction = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await initialiseApp();
        const data = _.get(response, 'data');
        if(response.status === 200){
            return dispatch(_initializeApp(data))
        }
    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        return dispatch(hideLoader());
    }
}
