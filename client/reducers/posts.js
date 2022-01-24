import _ from "lodash";
import { ACTIONS } from "../config/constants";

const postsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_POSTS:
        case ACTIONS.SUBMIT_POSTS:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.posts',[]);
        default:
            return state;
    }
}

export default postsReducer;
