import { combineReducers } from 'redux';
import data from './data';
import errors from './errors';
import messages from './messages';
import user from './user';

const rootReducer = combineReducers({
    data,
    errors,
    messages,
    user
});

export default rootReducer;

