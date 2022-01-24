import { ACTIONS } from "../config/constants"
import { showLoader, hideLoader }  from "./app";
import {createCollection, deleteCollection, loadCollections, updateCollection} from '../utils/apiUtils';
import _ from 'lodash';

// actions
const _addCollection = (data) => {
    return {
        type: ACTIONS.ADD_COLLECTION,
        data
    }
}

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

const _receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})

// action creators
export const loadCollectionsAction = () => async dispatch => {
    try {
        dispatch(showLoader());
        const response = await loadCollections();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_loadCollections(data));
        }
        // todo: else part
    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wring']}));
        }
    } finally {
        dispatch(hideLoader());
    }
};

export const updateCollectionAction =(collection) => async dispatch => {
    try {
        dispatch(showLoader());
        const response = await updateCollection(collection);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(_updateCollection(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wring']}));
        }
    }
    finally {
        dispatch(hideLoader());
    }
}

export const deleteCollectionAction =(collection) => async dispatch => {
    try {
        dispatch(showLoader());
        const response = await deleteCollection(collection);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            if(data && data.data) {
                data.data.collections = [collection];
            }
            dispatch(loadCollectionsAction());
            return dispatch(_deleteCollection(data));
        }

    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wring']}));
        }
    }
}

export const addCollectionAction = (collection) => async dispatch => {
    try {
        dispatch(showLoader());
        const response = await createCollection(collection);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            dispatch(loadCollectionsAction());
            return dispatch(_addCollection(data));
        }
    } catch (err) {
        if(err.response) {
            return dispatch(_receiveErrors(err.response.data));
        } else {
            return dispatch(_receiveErrors({errors:['something went wring']}));
        }
    }
}
