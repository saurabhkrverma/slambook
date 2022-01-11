// file to create a the response payload which will be send back to the client.

import _ from 'lodash';
import { RESPONSE_TYPES }  from '../configs/constants';

const _createUserObject = (user={}) => {
    const filteredUser = {
        email: _.get(user,'email'),
        name: _.get(user, 'name')
    }

    return filteredUser;
}

const _getUsers = (users=[])=> {
    const filteredUsers = users.map((user)=> {
        return _createUserObject(user);
    });
    return filteredUsers;
}

const _createCollectionObject = (collection={}) => {
    const filteredCollection = {
        email: _.get(collection,'email'),
        name: _.get(collection,'name'),
        collectionId: _.get(collection,'collectionId'),
        questionnaire: _.get(collection,'questionnaire'),
    }
    return filteredCollection;
};

const _getCollections = (questionnaires = []) => {
    const filteredCollections = questionnaires.map((collection)=> {
        return _createCollectionObject(collection);
    })
    return filteredCollections;
};


export const buildResponse = (req, responseType, payload) => {
    const response = {
        data: {},
        errors: [],
        messages: [],
        user: {}
    };
    switch(responseType) {
        case RESPONSE_TYPES.USER_LOGIN_SUCCESS: {
            response.messages.push(payload);
            break;
        }
        case RESPONSE_TYPES.USER_LOGIN_FAILURE: {
            response.errors.push(payload.message);
            break;
        }
        case RESPONSE_TYPES.USER_LOGOUT_SUCCESS: {
            response.messages.push(payload);
            break;
        }
        case RESPONSE_TYPES.USER_LOGOUT_FAILURE: {
            response.errors.push(payload);
            break;
        }
        case RESPONSE_TYPES.USER_FETCH_SUCCESS: {
            response.data.users = _getUsers(payload);
            break;
        }
        case RESPONSE_TYPES.USER_REGISTRATION_SUCCESS: {
            response.messages.push(payload);
            break;
        }
        case RESPONSE_TYPES.USER_REGISTRATION_FAILURE: {
            response.errors.push(payload);
            break;
        }

        case RESPONSE_TYPES.COLLECTION_ADDITION_SUCCESS: {
            response.messages.push(payload);
            break;
        }

        case RESPONSE_TYPES.COLLECTION_ADDITION_FAILURE: {
            response.errors.push(payload);
            break;
        }

        case RESPONSE_TYPES.COLLECTION_FETCH_SUCCESS: {
            response.data.collections = _getCollections(payload);
            break;
        }

        case RESPONSE_TYPES.COLLECTION_FETCH_FAILURE: {
            response.messages.push(payload);
            break;
        }

        case RESPONSE_TYPES.COLLECTION_PATCH_SUCCESS:
        case RESPONSE_TYPES.COLLECTION_DELETE_SUCCESS: {
            response.messages.push(payload);
            break;
        }
        case RESPONSE_TYPES.COLLECTION_DELETE_FAILURE:
        case RESPONSE_TYPES.COLLECTION_PATCH_FAILURE: {
            response.errors.push(payload);
            break;
        }

        case RESPONSE_TYPES.REQUEST_SUBMISSION_SUCCESS: {
            response.messages.push(payload);
            break;
        }

        case RESPONSE_TYPES.REQUEST_SUBMISSION_FAILURE: {
            response.errors.push(payload);
            break;
        }

        default:
            break;
    }
    response.user = _createUserObject(_.get(req, 'user', {}));
    return response;
};

export default buildResponse;
