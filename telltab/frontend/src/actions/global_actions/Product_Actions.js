import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    SELECT_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT
} from './global_types';
import api from '../../apis/api';
import history from '../../history';

export const createProduct = (formValues) => async (dispatch, getState) => { 
    let name = formValues.name;
    const { secret } = getState().auth;
    const response = await api.post('/products/create', {secret, name});
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push('/home')
}

export const retrieveProducts = () => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.post('/products/retrieve', { secret });
    dispatch({ type: RETRIEVE_PRODUCTS, payload: response.data });
}

export const editProduct = (id, name) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.put(`/products/edit/${id}`, { name });
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
}

export const selectProduct = (product) => {
    return {
        type: SELECT_PRODUCT,
        payload: product
    }
}
