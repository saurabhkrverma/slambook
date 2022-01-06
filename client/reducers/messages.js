import _ from "lodash";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, REGISTER_NEW_USER, DISMISS_ALERT_BOX } from "../actions/user";

const messagesReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _.get(action,'data.messages',state);
        case LOGOUT_CURRENT_USER:
            return _.get(action,'data.messages',state);
        case REGISTER_NEW_USER:
            return _.get(action,'data.messages',state);
        case DISMISS_ALERT_BOX:
            return [];
        default:
            return state;
    }
}

export default messagesReducer;
