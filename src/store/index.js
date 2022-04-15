import { applyMiddleware, combineReducers, createStore } from "redux";
import { bookReducer } from "./state/books";
import thunkMiddleware from 'redux-thunk';
import logger from "redux-logger";
import { searchReducer } from "./state/search";

const reducers = combineReducers({
    bookDomain: bookReducer,
    searchDomain: searchReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger))