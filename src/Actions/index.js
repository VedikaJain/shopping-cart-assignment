import axios from 'axios';
// import { toast } from 'react-toastify';
import * as Constants from '../global-constants';

import {
    SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS, SET_CART,
    SET_LOGIN_STATUS, SET_CART_STATUS, SET_REGISTER_STATUS, SET_SELECTED_CATEGORY
} from './types';

export function setCategories(cat) {
    if (cat && cat.length > 0) {
        cat = cat.filter((category) => category.enabled)
        cat.sort((category1, category2) => category1.order - category2.order);
    }
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

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': Constants.UrlClient,
        'cross-origin': true,
    }
}

export const fetchData = (url) => {
    config.headers['Access-Control-Allow-Methods'] = 'options, get';
    return async (dispatch) => {
        try {
            const response = await axios.get(Constants.UrlServer + url, config);
            switch (url) {
                case Constants.UrlCategoriesApi: dispatch(setCategories(response.data)); break;
                case Constants.UrlBannersApi: dispatch(setBanners(response.data)); break;
                case Constants.UrlProductsApi: dispatch(setProducts(response.data)); break;
                case Constants.UrlCartApi: dispatch(setCart(response.data)); break;
                default: break;
            }
        }
        catch (error) {
            // toast.error(Constants.ErrorRetrievingData + error,
            //     { toastId: Constants.ErrorCodeRetrievingData });
            throw (error);
        }
    };
};

export const postData = (url, data) => {
    config.headers['Access-Control-Allow-Methods'] = 'options, post';
    return async (dispatch) => {
        try {
            const response = await axios.post(Constants.UrlServer + url, data, config);
            switch (url) {
                case Constants.UrlLoginApi: dispatch(setLoginStatus(response.status)); break;
                case Constants.UrlRegisterApi: dispatch(setRegisterStatus(response.status)); break;
                case Constants.UrlCartApi: dispatch(setCartStatus(response.status)); break;
                default: break;
            };
        }
        catch (error) {
            // toast.error(Constants.ErrorAddingData + error,
            //     { toastId: Constants.ErrorCodeAddingData });
            throw (error);
        }
    };
};

export const putData = (url, data) => {
    config.headers['Access-Control-Allow-Methods'] = 'options, put';
    return async (dispatch) => {
        try {
            const response = await axios.put(Constants.UrlServer + url + '/' + data.id, data, config);
            switch (url) {
                case Constants.UrlCartApi: dispatch(setCartStatus(response.status)); break;
                default: break;
            };
        }
        catch (error) {
            // toast.error(Constants.ErrorUpdatingData + error,
            //     { toastId: Constants.ErrorCodeUpdatingData });
            throw (error);
        }
    };
};

export const deleteData = (url, id) => {
    config.headers['Access-Control-Allow-Methods'] = 'options, delete';
    return async (dispatch) => {
        try {
            const response = await axios.delete(Constants.UrlServer + url + '/' + id, config);
            switch (url) {
                case Constants.UrlCartApi: dispatch(setCartStatus(response.status)); break;
                default: break;
            };
        }
        catch (error) {
            // toast.error(Constants.ErrorDeletingData + error,
            //     { toastId: Constants.ErrorCodeDeletingData });
            throw (error);
        }
    };
}

export const resetPostStatus = (url) => {
    return async (dispatch) => {
        switch (url) {
            case Constants.UrlLoginApi: dispatch(setLoginStatus('')); break;
            case Constants.UrlRegisterApi: dispatch(setRegisterStatus('')); break;
            default: break;
        };
    }
}

export const saveData = (item, value) => {
    return async (dispatch) => {
        switch (item) {
            case Constants.UrlSelectedCategory: dispatch(setSelectedCategory(value)); break;
            default: break;
        }
    }
}