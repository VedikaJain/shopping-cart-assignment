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
    console.log('coming here first.....');
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            "cross-origin": true,
            "Access-Control-Allow-Methods": 'options, get, put, post, delete',
        }
    }
    return async (dispatch) => {
        try {
            console.log('coming here.....');
            const response = await axios.get(`http://localhost:5000/${url}`, config);
            console.log("response is: "+ JSON.stringify(response));
            switch(url) {
                case 'categories': dispatch(setCategories(response.data)); break;
                case 'banners': dispatch(setBanners(response.data)); break;
                case 'products': dispatch(setProducts(response.data)); break;
                default: break;
            }
        }
        catch (error) {
            console.log("error is: " + error);
            throw (error);
        }
    };
}; 