import { ACTIONS } from "../config/constants";
const defaultState = {
    "currentPage": 1
}

const appReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.SHOW_LOADER:
        case ACTIONS.HIDE_LOADER:
        case ACTIONS.UPDATE_CURRENT_PAGE_NUMBER:
            return {...state,...action.data};
        default:
            return state
    }
}

export default appReducer;
