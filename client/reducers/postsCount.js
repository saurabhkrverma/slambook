import { ACTIONS } from "../config/constants";
import _ from "lodash";

const postsCountReducer = (state = 0, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_POSTS:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.postsCount',0);
        case ACTIONS.DELETE_POST:
            return state-1;
        default:
            return state;
    }
}

export default postsCountReducer;
