import _ from "lodash";
import { ACTIONS } from "../config/constants";

const collectionsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_COLLECTIONS:
            return _.get(action,'data.data.collections',[]);
        default:
            return state;
    }
}

export default collectionsReducer;
