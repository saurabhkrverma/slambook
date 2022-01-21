import _ from "lodash";
import { ACTIONS } from "../config/constants";

const appReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.SHOW_LOADER:
        case ACTIONS.HIDE_LOADER:
            return {...state,...action.data};
        default:
            return state
    }
}

export default appReducer;
