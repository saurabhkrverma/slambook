import { loginUser, logoutUser, registerUser } from '../utils/apiUtils';
import _ from 'lodash';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const REGISTER_NEW_USER = "REGISTER_NEW_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const DISMISS_ALERT_BOX = "DISMISS_ALERT_BOX";

const receiveCurrentUser = data => ({
    type: RECEIVE_CURRENT_USER,
    data
});

const logoutCurrentUser = data => ({
    type: LOGOUT_CURRENT_USER,
    data
});

const registerNewUser = data => ({
    type: REGISTER_NEW_USER,
    data
})

const receiveErrors = data => ({
    type: RECEIVE_ERRORS,
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

    }
};

export const logoutUserAction = () => async dispatch => {
    try {
        const response = await logoutUser();
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(logoutCurrentUser(data));
        }

    } catch(error) {
        return dispatch(receiveErrors(data));
    }
};

export const registerUserAction = (userInfo) => async (dispatch) => {
    try{
        const response = await registerUser(userInfo);
        const data = _.get(response, 'data');
        if (response.status === 200) {
            return dispatch(registerNewUser(data));
        }
    } catch (err) {
        if(err.response) {
            return dispatch(receiveErrors(err.response.data));
        } else {
            return dispatch(receiveErrors({errors:['something went wring']}));
        }

    }
}
