import { loginUser } from '../utils/apiUtils';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const loginUserAction = (credentials) => async dispatch => {
        console.log("yahan na aa raha hai kya bhai");
        try {
            const response = await loginUser(credentials);
            const data = response.data;

            if (response.status === 200) {
                return dispatch(receiveCurrentUser(data));
            }
            // return dispatch(receiveErrors(data));
        } catch (error) {
            console.log("error : ", error)
        }
    };

export const logout = () => async dispatch => {
    const response = await apiUtil.logout();
    const data = await response.json();

    if (response.ok) {
        return dispatch(logoutCurrentUser());
    }
    return dispatch(receiveErrors(data));
};
