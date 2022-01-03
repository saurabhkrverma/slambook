import { loginUser, logoutUser } from '../utils/apiUtils';
import _ from 'lodash';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = data => ({
    type: RECEIVE_CURRENT_USER,
    data
});

const logoutCurrentUser = data => ({
    type: LOGOUT_CURRENT_USER,
    data
});

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

export const logout = () => async dispatch => {
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
