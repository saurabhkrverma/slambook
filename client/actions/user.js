import {hideLoader, showLoader} from "./app";
import {loginUser, logoutUser, updateUser, registerUser, resetPassword} from '../utils/apiUtils';
import { ACTIONS } from "../config/constants"
import _ from 'lodash';

const receiveCurrentUser = data => ({
    type: ACTIONS.RECEIVE_CURRENT_USER,
    data
});

const logoutCurrentUser = data => ({
    type: ACTIONS.LOGOUT_CURRENT_USER,
    data
});

const updateCurrentUser = data => ({
    type: ACTIONS.UPDATE_CURRENT_USER,
    data
})

const registerNewUser = data => ({
    type: ACTIONS.REGISTER_NEW_USER,
    data
})

const receiveErrors = data => ({
    type: ACTIONS.RECEIVE_ERRORS,
    data
})


// action creators
export const loginUserAction = (credentials) => async dispatch => {
    try {
        const response = await loginUser(credentials);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(receiveCurrentUser(data));
        }
        // todo: else part
    } catch (error) {
        //todo: error handling
        return;

    } finally {
        dispatch(hideLoader());
    }
};

export const logoutUserAction = () => async dispatch => {
    try {
        dispatch(showLoader());
        const response = await logoutUser();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(logoutCurrentUser(data));
        }

    } catch(error) {
        return dispatch(receiveErrors(data));
    } finally {
        dispatch(hideLoader());
    }
};

export const registerUserAction = (userInfo) => async (dispatch) => {
    try{
        dispatch(showLoader());
        const response = await registerUser(userInfo);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(registerNewUser(data));
        }
    } catch (err) {
        if(err.response) {
            return dispatch(receiveErrors(err.response.data));
        } else {
            return dispatch(receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}

export const updateUserPasswordAction = (userInfo) => async (dispatch) => {
    try{
        const response = await resetPassword(userInfo);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(updateCurrentUser(data));
        }
    } catch (err) {
        if(err.response) {
            return dispatch(receiveErrors(err.response.data));
        } else {
            return dispatch(receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}


export const updateUserAction = (userInfo) => async (dispatch) => {
    try{
        dispatch(showLoader());
        const response = await updateUser(userInfo);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(updateCurrentUser(data));
        }
    } catch (err) {
        if(err.response) {
            return dispatch(receiveErrors(err.response.data));
        } else {
            return dispatch(receiveErrors({errors:['something went wrong']}));
        }
    } finally {
        dispatch(hideLoader());
    }
}
