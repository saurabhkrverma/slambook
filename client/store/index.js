import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const _initState = {
    session: null
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createSlamBookStore = (initialState = _initState) => {
   return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default createSlamBookStore;
