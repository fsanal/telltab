import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    SELECT_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT
} from './types';
import api from '../apis/api';
import history from '../history';

export const createProduct = (secret, name, url) => async dispatch => {
    const response = await api.post('/products/create', {secret, name, url});
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
}

export const retrieveProducts = (secret) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.post('/products/retrieve', { secret });
    dispatch({ type: RETRIEVE_PRODUCTS, payload: response.data });
}

export const editProduct = (id, name) => async (dispatch) => {
    const response = await api.put(`/products/edit/${id}`, { name });
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
}

export const selectProduct = (product) => {
    return {
        type: SELECT_PRODUCT,
        payload: product
    }
}
