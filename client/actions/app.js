import {ACTIONS} from "../config/constants";


export const showLoader = () => {
    return {
        type: ACTIONS.SHOW_LOADER,
        data : {
            showLoader: true
        }
    }
}

export const hideLoader = () => {
    return {
        type: ACTIONS.HIDE_LOADER,
        data: {
            showLoader: false
        }
    }
}
