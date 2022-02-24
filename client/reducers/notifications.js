import { ACTIONS } from "../config/constants";
import _ from "lodash";

const notificationsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case ACTIONS.LOGOUT_CURRENT_USER:
        case ACTIONS.LOAD_NOTIFICATIONS:
        case ACTIONS.INITIALIZE_APP:
            return _.get(action,'data.data.notifications',[]);
        case ACTIONS.CLEAR_NOTIFICATION:
            const newState = [...state];
            const notification = _.get(action, "data", {});
            newState.splice(notification.index, 1);
            return newState;
        case ACTIONS.CLEAR_ALL_NOTIFICATIONS:
            return [];
        default:
            return state;
    }
}

export default notificationsReducer;
