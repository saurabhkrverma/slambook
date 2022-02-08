import { ACTIONS } from "../config/constants";
import _ from "lodash";

const notificationsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_NOTIFICATIONS:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.notifications',[]);
        default:
            return state;
    }
}

export default notificationsReducer;
