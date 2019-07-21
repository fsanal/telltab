import {
    GET_PRODUCT,
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    SELECT_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT
} from '../types/global_types';
import api from '../../apis/api';
import history from '../../history';
import { createForum } from '../feedback_forum_actions/Forum_Actions'

export const createProduct = (formValues) => async (dispatch, getState) => { 
    let name = formValues.name;
    const { secret } = getState().auth;
    const response = await api.post('/products/create', {secret, name});
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push('/home/products')
}

export const retrieveProducts = () => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.post('/products/retrieve', { secret });
    dispatch({ type: RETRIEVE_PRODUCTS, payload: response.data });
}

export const getProduct = (id) => async (dispatch) => {
    const response = await api.get(`/products/get/${id}`);
    dispatch({ type: GET_PRODUCT, payload: response.data });
    return response.data;
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

export const deleteProduct = (product) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    let id = product._id;
    const response = await api.delete(`/products/delete/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: response.data });
    history.push('/home/products')
}
