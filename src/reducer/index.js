import {SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS} from '../Common/Actions/types';
import {combineReducers} from 'redux';

const initialState = {
    categories: {},
    banners: {},
    products: {}
}


function setData(state = initialState, action) {
    switch(action.type) {
        case SET_CATEGORIES: return Object.assign({}, state, {
            categories: action.payload
        });
        case SET_BANNERS: return Object.assign({}, state, {
            banners: action.payload
        });
        case SET_PRODUCTS: return Object.assign({}, state, {
            products: action.payload
        });
        default: return state;
    }
}

const combRed = combineReducers({setData});

export default combRed;