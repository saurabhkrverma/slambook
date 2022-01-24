import _ from "lodash";
import { ACTIONS } from "../config/constants";

const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.RECEIVE_ERRORS:
        case ACTIONS.SUBMIT_POSTS:
        case ACTIONS.UPDATE_CURRENT_USER:
            return _.get(action,'data.errors',state);
        case ACTIONS.DISMISS_ALERT_BOX:
            return [];
        default:
            return _.get(action,'data.errors',state);
    }
}

export default errorsReducer;
