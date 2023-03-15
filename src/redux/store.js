import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default createStore(rootReducer, composedEnhancer);
