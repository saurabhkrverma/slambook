import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { initialiseApp } from "../utils/apiUtils";

const _getInitialState = async () => {
    let _initState = {};
    try {
        _initState = await initialiseApp();
        if(_initState.status === 200){
            _initState = _initState.data;
        } else {
            throw new Error();
        }
        return _initState
    } catch (err) {
        return _initState;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createSlamBookStore = async () => {
    const initState = await _getInitialState();
    return createStore(rootReducer, initState, composeEnhancers(applyMiddleware(thunk)));
}

export default createSlamBookStore;
