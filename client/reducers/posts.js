import _ from "lodash";
import { ACTIONS } from "../config/constants";

const postsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.SUBMIT_POSTS:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.posts',[]);
        case ACTIONS.LOAD_POSTS:
            const newPosts = _.get(action,'data.data.posts',[]);
            return [...state, ...newPosts];
        case ACTIONS.DELETE_POST:
            const newState = [...state];
            const deletedPost = _.get(action,'data.data.posts',[]);
            if(deletedPost && deletedPost.length>0) {
                const deletedPostIndex = deletedPost[0].index;
                newState.splice(deletedPostIndex, 1);
            }
            return newState;
        default:
            return state;
    }
}

export default postsReducer;
