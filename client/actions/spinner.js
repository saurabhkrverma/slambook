import { ACTIONS } from "../config/constants"

// actions
export const loadCollectionSpinnerAction = () => {
    return {
        type: ACTIONS.SPINNER_LOAD_COLLECTION,
        data: {
            "loadCollectionSpinner": true
        }
    }
}
