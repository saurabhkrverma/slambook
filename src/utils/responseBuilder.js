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
        case RESPONSE_TYPES.GET_USERS_SUCCESS: {
            response.data.users = _getUsers(payload);
            break;
        }
        default:
            break;
    }
    response.user = _createUserObject(_.get(req, 'user', {}));
    return response;
};

export default buildResponse;
