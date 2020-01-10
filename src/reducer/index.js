import {
    SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS, SET_CART,
    SET_REGISTER_STATUS, SET_LOGIN_STATUS, SET_CART_STATUS, SET_SELECTED_CATEGORY
} from '../Actions/types';
import { combineReducers } from 'redux';

const initialState = {
    categories: [],
    banners: [],
    products: [],
    cart: [],
    registerStatus: '',
    loginStatus: '',
    cartStatus: '',
    selectedCategory: {}
}

function setData(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES: return Object.assign({}, state, {
            categories: action.payload
        });
        case SET_BANNERS: return Object.assign({}, state, {
            banners: action.payload
        });
        case SET_PRODUCTS: return Object.assign({}, state, {
            products: action.payload
        });
        case SET_CART: return Object.assign({}, state, {
            cart: action.payload
        });
        case SET_REGISTER_STATUS: return Object.assign({}, state, {
            registerStatus: action.payload
        });
        case SET_LOGIN_STATUS: return Object.assign({}, state, {
            loginStatus: action.payload
        });
        case SET_CART_STATUS: return Object.assign({}, state, {
            cartStatus: action.payload
        });
        case SET_SELECTED_CATEGORY: return Object.assign({}, state, {
            selectedCategory: action.payload
        });
        default: return state;
    }
}

const combRed = combineReducers({ setData });

export default combRed;