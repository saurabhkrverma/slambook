import _ from 'lodash';
import { ACTIONS } from "../config/constants";

const dataReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.RECEIVE_CURRENT_USER:
            return _.get(action,'data.data',state);
        case ACTIONS.LOGOUT_CURRENT_USER:
            return _.get(action,'data.data',state);
        case ACTIONS.REGISTER_NEW_USER:
            return _.get(action,'data.data',state);
        case ACTIONS.LOAD_COLLECTIONS:
            const newState = Object.assign({}, state);
            const collections = _.get(action,'data.data.collections',[]);
            newState.collections = collections;
            return newState
            // return _.get(action,'data.data',state);
        case ACTIONS.DELETE_COLLECTION:
            return _.get(action,'data.data',state);
        case ACTIONS.ADD_COLLECTION:
            return _.get(action,'data.data',state);
        case ACTIONS.LOAD_POSTS:
            //todo nested reducer
            const newState_1 = Object.assign({}, state);
            const posts = _.get(action,'data.data.posts',[]);
            newState_1.posts = posts;
            return newState_1
        default:
            return state;
    }
}

export default dataReducer;
