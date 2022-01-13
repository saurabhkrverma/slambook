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
            return _.get(action,'data.data',state);
        case ACTIONS.DELETE_COLLECTION:
            // remove this collection
            const newState = Object.assign({},state);
            if(action.data && action.data && action.data.data.collections) {
                newState.collections = newState.collections.filter((collection)=> {
                    return collection.collectionId !== action.data.data.collections[0].collectionId
                });
                return newState;
            } else {
                return newState;
            }
            break;
        default:
            return state;
    }
}

export default dataReducer;
