import { combineReducers } from 'redux';
import data from './data';
import errors from './errors';
import messages from './messages';
import user from './user';
import app from './app';

const rootReducer = combineReducers({
    data,
    errors,
    messages,
    user,
    app
});

export default rootReducer;

