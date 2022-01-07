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
        default:
            return state;
    }
}

export default dataReducer;
