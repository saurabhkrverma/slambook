// file to create a the response payload which will be send back to the client.

import _ from 'lodash';
import { RESPONSE_TYPES }  from '../configs/constants';
import questionnaire from "../routes/api/questionnaire";

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

const _createQuestionnaireObject = (questionnaire={}) => {
    const filteredQuestionnaire = {
        email: _.get(questionnaire,'email'),
        name: _.get(questionnaire,'name'),
        collectionId: _.get(questionnaire,'collectionId'),
        form: _.get(questionnaire,'form'),
    }
    return filteredQuestionnaire;
};

const _getQuestionnaires = (questionnaires = []) => {
    const filteredQuestionnaires = questionnaires.map((questionnaire)=> {
        return _createQuestionnaireObject(questionnaire);
    })
    return filteredQuestionnaires;
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

        case RESPONSE_TYPES.QUESTIONNAIRE_ADDITION_SUCCESS: {
            response.messages.push(payload);
            break;
        }

        case RESPONSE_TYPES.QUESTIONNAIRE_ADDITION_FAILURE: {
            response.errors.push(payload);
            break;
        }

        case RESPONSE_TYPES.QUESTIONNAIRE_FETCH_SUCCESS: {

            response.data.questionnaire = [];
            response.data.questionnaire.push(_getQuestionnaires(payload));
            break;
        }

        case RESPONSE_TYPES.QUESTIONNAIRE_FETCH_FAILURE: {
            response.messages.push(payload);
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
