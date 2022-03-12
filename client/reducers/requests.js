import _ from "lodash";
import { ACTIONS } from "../config/constants";

const requestsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.requests',[]);
        case ACTIONS.SUBMIT_POSTS:
            const err = _.get(action,'data.errors',[]);
            const otpHash = _.get(action,'data.data.otpHash');
            if(err && err.length >0) {
                // if there's an error in submitting the post, keep user on the same page
                return state;
            }
            else if(otpHash) {
                const newState = _.cloneDeep(state);
                const post = newState[0];
                if(post) {
                    post.otpHash = otpHash;
                }
                return newState;
            }
            return _.get(action,'data.data.requests',[]);
        default:
            return state;
    }
}

export default requestsReducer;
