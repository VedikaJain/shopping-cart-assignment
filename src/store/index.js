import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';

export const store = createStore(
    reducer, composeEnhancer(applyMiddleware(thunk))
);