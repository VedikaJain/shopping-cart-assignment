import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/index';
import thunk from 'redux-thunk';

const composeEnhancer = compose;

export const store = createStore(
    reducer, composeEnhancer(applyMiddleware(thunk))
);