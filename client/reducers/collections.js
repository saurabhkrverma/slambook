import _ from "lodash";
import { ACTIONS, DEFAULT_COLLECTION } from "../config/constants";

const collectionsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_COLLECTIONS:
        case ACTIONS.INITIALIZE_APP:
            const collections =  _.get(action,'data.data.collections',[]);
            collections.push(DEFAULT_COLLECTION);
            return collections;
        default:
            return state;
    }
}

export default collectionsReducer;
