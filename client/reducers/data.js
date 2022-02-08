import { combineReducers } from 'redux';
import collections from "./collections";
import posts from "./posts";
import requests from "./requests";
import notifications from "./notifications";

const dataReducer = combineReducers({
    collections,
    posts,
    requests,
    notifications
});

export default dataReducer;
