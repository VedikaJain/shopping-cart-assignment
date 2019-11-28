import axios from 'axios';

import {SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS} from './types';

export function setCategories(cat) {
    return { type: SET_CATEGORIES, payload: cat};
}
export function setBanners(ban) {
    return { type: SET_BANNERS, payload: ban};
}
export function setProducts(prod) {
    return { type: SET_PRODUCTS, payload: prod};
}

export const fetchData = (url) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            "cross-origin": true,
            "Access-Control-Allow-Methods": 'options',
        }
    }
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}.json`, config);
            switch(url) {
                case 'categories': dispatch(setCategories(response.data));
                case 'banners': dispatch(setBanners(response.data));
                case 'products': dispatch(setProducts(response.data));
            }
        }
        catch (error) {
            throw (error);
        }
    };
}; 