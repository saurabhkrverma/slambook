import _ from "lodash";
import { ACTIONS } from "../config/constants";

const appReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        // case ACTIONS.SPINNER_LOAD_COLLECTION:
        //     let newState_1 = Object.assign({},state);
        //     if(newState_1.spinner) {
        //         Object.assign(newState_1.spinner, action.data);
        //     } else {
        //         newState_1.spinner = action.data
        //     }
        //     return newState_1;
        //     break;
        // case ACTIONS.LOAD_COLLECTIONS:
        //     let newState_2 = Object.assign({},state);
        //     if(newState_2.spinner){
        //         newState_2.spinner.loadCollectionSpinner = false;
        //     }
        //     return newState_2;
        //     break;
        default:
            return state
    }
}

export default appReducer;
