import _ from "lodash";
import { ACTIONS } from "../config/constants";

const requestsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.SUBMIT_POSTS:
            return _.get(action,'data.data.requests',[]);
        default:
            return state;
    }
}

export default requestsReducer;
