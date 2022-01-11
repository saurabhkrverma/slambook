import _ from "lodash";
import { ACTIONS } from "../config/constants";

const messagesReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.RECEIVE_CURRENT_USER:
            return _.get(action,'data.messages',state);
        case ACTIONS.LOGOUT_CURRENT_USER:
            return _.get(action,'data.messages',state);
        case ACTIONS.REGISTER_NEW_USER:
            return _.get(action,'data.messages',state);
        case ACTIONS.UPDATE_COLLECTION:
            return _.get(action,'data.messages',state);
        case ACTIONS.DELETE_COLLECTION:
            return _.get(action,'data.messages',state);
        case ACTIONS.DISMISS_ALERT_BOX:
            return [];
        default:
            return state;
    }
}

export default messagesReducer;
