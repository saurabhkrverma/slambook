import { getPosts } from "../utils/apiUtils"
import { ACTIONS } from "../config/constants"
import _ from "lodash";


const _getPosts = (data) => {
    return {
        type: ACTIONS.LOAD_POSTS,
        data
    }
}


export const getPostsAction = () => async (dispatch) => {
    try {
        const response = await getPosts();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_getPosts(data));
        }

    } catch (err) {
        // todo error hadling here
        console.log(err);
        return;
    }
}
