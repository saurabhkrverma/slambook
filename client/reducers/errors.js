import _ from "lodash";
import { ACTIONS } from "../config/constants";

const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.RECEIVE_ERRORS:
            return _.get(action,'data.errors',state);
        case ACTIONS.DISMISS_ALERT_BOX:
            return [];
        default:
            return _.get(action,'data.errors',state);
    }
}

export default errorsReducer;
