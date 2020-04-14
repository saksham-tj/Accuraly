import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import contextReducer from './reducer/contextReducer';
import questionReducer from './reducer/questionReducer';
import userDetailsReducer from './reducer/userDetailsReducer';


const combinedReducers = combineReducers({
    contextReducer, 
    questionReducer,
    userDetailsReducer
})

export default createStore(combinedReducers ,applyMiddleware(thunk))