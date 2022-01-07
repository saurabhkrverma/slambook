import _ from "lodash";
import { ACTIONS } from "../config/constants";

const _nullUser = {
    email: null,
    password: null
}

const userReducer = (state = _nullUser, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.RECEIVE_CURRENT_USER:
            return _.get(action,'data.user',state);
        case ACTIONS.LOGOUT_CURRENT_USER:
            return _.get(action,'data.user',state);
        case ACTIONS.REGISTER_NEW_USER:
            return _.get(action,'data.user',state);
        default:
            return state;
    }
}

export default userReducer;
