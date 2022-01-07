import { ACTIONS } from "../config/constants"
import { loadCollections } from '../utils/apiUtils';
import _ from 'lodash';

// actions
const _loadCollections = (data) => {
    return {
        type: ACTIONS.LOAD_COLLECTIONS,
        data
    }
}

// action creators
export const loadCollectionsAction = () => async dispatch => {
    try {
        const response = await loadCollections();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_loadCollections(data));
        }
        // todo: else part
    } catch (error) {
        //todo: error handling
        return;

    }
};
