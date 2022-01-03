import _ from "lodash";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/user";

const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _.get(action,'data.errors',state);
        case LOGOUT_CURRENT_USER:
            return _.get(action,'data.errors',state);
        default:
            return state;
    }
}

export default errorsReducer;
