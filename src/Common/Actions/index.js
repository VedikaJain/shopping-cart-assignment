import axios from 'axios';

import {
    SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS, SET_CART,
    SET_LOGIN_STATUS, SET_CART_STATUS, SET_REGISTER_STATUS, SET_SELECTED_CATEGORY
} from './types';

export function setCategories(cat) {
    return { type: SET_CATEGORIES, payload: cat };
}
export function setBanners(ban) {
    return { type: SET_BANNERS, payload: ban };
}
export function setProducts(prod) {
    return { type: SET_PRODUCTS, payload: prod };
}
export function setCart(cart) {
    return { type: SET_CART, payload: cart };
}
export function setLoginStatus(prod) {
    return { type: SET_LOGIN_STATUS, payload: prod };
}
export function setCartStatus(prod) {
    return { type: SET_CART_STATUS, payload: prod };
}
export function setRegisterStatus(prod) {
    return { type: SET_REGISTER_STATUS, payload: prod };
}
export function setSelectedCategory(selectedCategory) {
    return { type: SET_SELECTED_CATEGORY, payload: selectedCategory };
}

export const fetchData = (url) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            "cross-origin": true,
            "Access-Control-Allow-Methods": 'options, get',
        }
    }
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`, config);
            switch (url) {
                case 'categories': dispatch(setCategories(response.data)); break;
                case 'banners': dispatch(setBanners(response.data)); break;
                case 'products': dispatch(setProducts(response.data)); break;
                case 'addToCart': dispatch(setCart(response.data)); break;
                default: break;
            }
        }
        catch (error) {
            console.log("Error: " + error);
            throw (error);
        }
    };
};

export const postData = (url, data) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            "cross-origin": true,
            "Access-Control-Allow-Methods": 'options, post',
        }
    }
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:5000/${url}`, data, config);
            switch (url) {
                case 'login': dispatch(setLoginStatus(response.status)); break;
                case 'register': dispatch(setRegisterStatus(response.status)); break;
                case 'addToCart': dispatch(setCartStatus(response.status)); break;
                default: break;
            };
        }
        catch (error) {
            console.log("Error: " + error);
            throw (error);
        }
    };
};

export const putData = (url, data) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            "cross-origin": true,
            "Access-Control-Allow-Methods": 'options, put',
        }
    }
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/${url}/${data.id}`, data, config);
            switch (url) {
                case 'addToCart': dispatch(setCartStatus(response.status)); break;
                default: break;
            };
        }
        catch (error) {
            console.log("Error: " + error);
            throw (error);
        }
    };
};

export const resetPostStatus = (url) => {
    return async (dispatch) => {
        switch (url) {
            case 'login': dispatch(setLoginStatus('')); break;
            case 'register': dispatch(setRegisterStatus('')); break;
            default: break;
        };
    }
}

export const saveData = (item, value) => {
    return async (dispatch) => {
        switch (item) {
            case 'selectedCategory': dispatch(setSelectedCategory(value)); break;
            default: break;
        }
    }
}