import { ACTIONS } from "../config/constants";
import _ from "lodash";

const notificationsCountReducer = (state = 0, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_NOTIFICATIONS_COUNT:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.notificationsCount',0);
        case ACTIONS.CLEAR_NOTIFICATION:
            return 0;
        case ACTIONS.LOAD_NOTIFICATIONS:
            return  _.get(action,'data.data.notifications',[]).length;
        default:
            return state;
    }
}

export default notificationsCountReducer;
