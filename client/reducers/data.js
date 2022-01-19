import { combineReducers } from 'redux';
import collections from "./collections";
import posts from "./posts";

const dataReducer = combineReducers({
    collections,
    posts
});

export default dataReducer;
