import { combineReducers } from 'redux';
import collections from "./collections";
import posts from "./posts";
import postsCount from "./postsCount";
import requests from "./requests";
import notifications from "./notifications";
import notificationsCount from "./notificationsCount";

const dataReducer = combineReducers({
    collections,
    posts,
    postsCount,
    requests,
    notifications,
    notificationsCount
});

export default dataReducer;
