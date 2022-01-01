import {
    RECEIVE_CURRENT_USER
} from "../actions/session";

const _nullSession = {
    email: null,
    password: null
}

const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.user;
        default:
            return state;
    }
}

export default sessionReducer;
