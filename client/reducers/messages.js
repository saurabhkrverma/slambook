import _ from "lodash";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/user";

const messagesReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _.get(action,'data.messages',state);
        case LOGOUT_CURRENT_USER:
            return _.get(action,'data.messages',state);
        default:
            return state;
    }
}

export default messagesReducer;
