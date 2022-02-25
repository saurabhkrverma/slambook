// file to create a the response payload which will be send back to the client.

import _ from 'lodash';
import { RESPONSE_TYPES }  from '../configs/constants';

const _createUserObject = (user={}) => {
    const filteredUser = {
        email: _.get(user,'email'),
        firstName: _.get(user, 'firstName'),
        lastName: _.get(user, 'lastName'),
        profilePic: _.get(user, 'profilePic'),
        createdOn: _.get(user, 'createdOn')
    }

    return filteredUser;
}

const _getUsers = (users=[])=> {
    const filteredUsers = users.map((user)=> {
        return _createUserObject(user);
    });
    return filteredUsers;
}

const _getPosts = (slambooks= []) => {
    const posts = slambooks.reduce((prevSlambook, slambook, ) => {
        const posts = slambook.posts.reduce((prevPost, post)=>{
            const updatedPost = Object.assign({}, post);
            updatedPost.collectionName = slambook.collectionName;
            updatedPost.user = _createUserObject(post.user);
            return prevPost.concat(updatedPost);
        },[]);
        return prevSlambook.concat(posts);
    },[]);
    return posts
}

const _createCollectionObject = (collection={}) => {
    const filteredCollection = {
        email: _.get(collection,'email'),
        collectionId: _.get(collection,'collectionId'),
        collectionName: _.get(collection,'collectionName'),
        createdOn: _.get(collection, 'createdOn'),
        questionnaire: _.get(collection,'questionnaire')
    }
    return filteredCollection;
};

const _getCollections = (questionnaires = []) => {
    if(Array.isArray(questionnaires)) {
        const filteredCollections = questionnaires.map((collection)=> {
            return _createCollectionObject(collection);
        });
        return filteredCollections;
    } else {
        return _createCollectionObject(questionnaires);
    }
};

const _createNotificationObject = (notification={}) => {
    const filteredNotification = {
        email: _.get(notification,'email'),
        collectionName: _.get(notification,'collectionDetails[0].collectionName'),
        collectionId: _.get(notification,'collectionId'),
        submitterName: _.get(notification,'submitterName'),
        submitterEmail: _.get(notification,'submitterEmail'),
    }
    return filteredNotification;
};

const _getNotifications = (notifications=[]) => {
    if(Array.isArray(notifications)) {
        const filteredNotifications = notifications.map((notification)=> {
            return _createNotificationObject(notification);
        });
        return filteredNotifications;
    } else {
        return _createNotificationObject(notifications);
    }
}


export const buildResponse = (req, responseType, payload) => {
    const response = {
        data: {},
        errors: [],
        messages: [],
        user: {}
    };
    switch(responseType) {
        // messages
        case RESPONSE_TYPES.USER_LOGIN_SUCCESS:
        case RESPONSE_TYPES.USER_REGISTRATION_SUCCESS:
        case RESPONSE_TYPES.USER_PASSWORD_RESET_SUCCESS:
        case RESPONSE_TYPES.USER_LOGIN_GOOGLE_SUCCESS:
        case RESPONSE_TYPES.USER_LOGOUT_SUCCESS:
        case RESPONSE_TYPES.COLLECTION_ADDITION_SUCCESS:
        case RESPONSE_TYPES.COLLECTION_FETCH_FAILURE:
        case RESPONSE_TYPES.COLLECTION_PATCH_SUCCESS:
        case RESPONSE_TYPES.COLLECTION_DELETE_SUCCESS:
        case RESPONSE_TYPES.POST_SUBMISSION_SUCCESS:
        case RESPONSE_TYPES.NOTIFICATION_ADDITION_SUCCESS:
        case RESPONSE_TYPES.NOTIFICATION_DELETE_SUCCESS:
        case RESPONSE_TYPES.USER_UPDATION_SUCCESS:
        case RESPONSE_TYPES.POST_DELETION_SUCCESS: {
            response.messages.push(payload);
            break;
        }

        // errors
        case RESPONSE_TYPES.USER_REGISTRATION_FAILURE:
        case RESPONSE_TYPES.USER_PASSWORD_RESET_FAILURE:
        case RESPONSE_TYPES.USER_LOGIN_GOOGLE_FAILURE:
        case RESPONSE_TYPES.COLLECTION_ADDITION_FAILURE:
        case RESPONSE_TYPES.COLLECTION_DELETE_FAILURE:
        case RESPONSE_TYPES.COLLECTION_PATCH_FAILURE:
        case RESPONSE_TYPES.POST_FETCH_FAILURE:
        case RESPONSE_TYPES.POST_SUBMISSION_FAILURE:
        case RESPONSE_TYPES.NOTIFICATION_FETCH_FAILURE:
        case RESPONSE_TYPES.NOTIFICATION_ADDITION_FAILURE:
        case RESPONSE_TYPES.NOTIFICATION_DELETE_FAILURE:
        case RESPONSE_TYPES.USER_UPDATION_FAILURE:
        case RESPONSE_TYPES.POST_DELETION_FAILURE: {
            response.errors.push(payload);
            break;
        }

        // data - user
        case RESPONSE_TYPES.USER_LOGIN_FAILURE: {
            response.errors.push(payload.message);
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
        // data - collections
        case RESPONSE_TYPES.COLLECTION_FETCH_SUCCESS: {
            response.data.collections = _getCollections(payload);
            break;
        }
        //data - posts
        case RESPONSE_TYPES.POST_FETCH_SUCCESS: {
            response.data.posts = _getPosts(payload[0]);
            response.data.postsCount = payload[1];
            break;
        }

        case RESPONSE_TYPES.NOTIFICATION_FETCH_SUCCESS: {
            response.data.notifications = _getNotifications(payload);
            break;
        }

        case RESPONSE_TYPES.NOTIFICATION_COUNT_FETCH_SUCCESS: {
            response.data.notificationsCount = payload;
            break;
        }

        default:
            break;
    }

    // check session object for data, messages and errors
    if(req.session && req.session.post) {
        response.data.requests = [ req.session.post ];
        delete req.session.post;
    }

    if(req.session && req.session.messages) {
        response.messages = response.messages.concat(req.session.messages);
        delete req.session.messages;
    }

    if(req.session && req.session.errors) {
        response.errors = response.errors.concat(req.session.errors);
        delete req.session.errors;
    }

    response.user = _createUserObject(_.get(req, 'user', {}));
    return response;
};

export default buildResponse;
