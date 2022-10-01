import { createStore, applyMiddleware, compose, } from "redux";
import thunk from 'redux-thunk';
import { rootReducers } from "../redux/CombineReducer";

const middleware = [thunk]
const composeEnhancers = compose(applyMiddleware(...middleware));
const configureStore = () => {
    return createStore(rootReducers, composeEnhancers);
}
export const store = configureStore();