import _ from "lodash";
import {RECEIVE_ERRORS, DISMISS_ALERT_BOX} from "../actions/user";

const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ERRORS:
            return _.get(action,'data.errors',state);
        case DISMISS_ALERT_BOX:
            return [];
        default:
            return _.get(action,'data.errors',state);
    }
}

export default errorsReducer;
