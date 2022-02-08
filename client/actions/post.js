import {hideLoader, showLoader} from "./app";
import { getPosts, submitPost } from "../utils/apiUtils"
import { ACTIONS } from "../config/constants"
import _ from "lodash";


const _getPosts = (data) => {
    return {
        type: ACTIONS.LOAD_POSTS,
        data
    }
}

const _submitPosts = (data) => {
    return {
        type: ACTIONS.SUBMIT_POSTS,
        data
    }
}

const _receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})


export const getPostsAction = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await getPosts();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_getPosts(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}

export const submitPostAction = (post) => async (dispatch) => {
    try {
        const response = await submitPost(post);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_submitPosts(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}
