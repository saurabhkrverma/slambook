import { combineReducers } from 'redux';
import collections from "./collections";
import posts from "./posts";
import requests from "./requests";

const dataReducer = combineReducers({
    collections,
    posts,
    requests
});

export default dataReducer;
