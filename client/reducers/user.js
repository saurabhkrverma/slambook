import _ from "lodash";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, REGISTER_NEW_USER } from "../actions/user";

const _nullUser = {
    email: null,
    password: null
}

const userReducer = (state = _nullUser, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return _.get(action,'data.user',state);
        case LOGOUT_CURRENT_USER:
            return _.get(action,'data.user',state);
        case REGISTER_NEW_USER:
            return _.get(action,'data.user',state);
        default:
            return state;
    }
}

export default userReducer;
