import { ACTIONS } from "../config/constants";
import _ from "lodash";
const defaultState = {
    "currentPage": 1,
    "defaultUser": {}
}

const appReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.SHOW_LOADER:
        case ACTIONS.HIDE_LOADER:
        case ACTIONS.UPDATE_CURRENT_PAGE_NUMBER:
            return {...state,...action.data};
        case ACTIONS.REGISTER_NEW_USER:
            const err = _.get(action,'data.errors',[]);
            const otpHash = _.get(action,'data.data.otpHash');
            const newState = _.cloneDeep(state);
            if(err && err.length >0) {
                // if there's an error in submitting the post, keep user on the same page
                return state;
            }
            else if(otpHash) {
                const defaultUser = action.data && action.data.userInfo;
                if(defaultUser) {
                    defaultUser.otpHash = otpHash;
                    newState.defaultUser = defaultUser
                }
                return newState;
            }
            newState.defaultUser = {};
            return newState;
        default:
            return state
    }
}

export default appReducer;
