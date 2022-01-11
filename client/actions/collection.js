import { ACTIONS } from "../config/constants"
import {deleteCollection, loadCollections, updateCollection} from '../utils/apiUtils';
import _ from 'lodash';

// actions
const _loadCollections = (data) => {
    return {
        type: ACTIONS.LOAD_COLLECTIONS,
        data
    }
}

const _updateCollection = (data) => {
    return {
        type: ACTIONS.UPDATE_COLLECTION,
        data
    }
}

const _deleteCollection = (data) => {
    return {
        type: ACTIONS.DELETE_COLLECTION,
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

export const updateCollectionAction =(collection) => async dispatch => {
    try {
        const response = await updateCollection(collection);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_updateCollection(data));
        }

    } catch (err) {
        //todo: error handling
        return;
    }
}

export const deleteCollectionAction =(collection) => async dispatch => {
    try {
        const response = await deleteCollection(collection);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_deleteCollection(data));
        }

    } catch (err) {
        //todo: error handling
        return;
    }
}
