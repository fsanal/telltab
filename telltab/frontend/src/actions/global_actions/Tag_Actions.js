import {
    CREATE_TAG,
    RETRIEVE_TAGS,
    SELECT_TAG,
    DELETE_TAG,
} from '../types/global_types';
import api from '../../apis/api';
import history from '../../history';

export const selectTag = (tag) => {
    return {
        type: SELECT_TAG,
        payload: tag
    }
}

export const findTag = (name) => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let productID;
    if (currentProduct) productID = currentProduct._id;
    const response = await api.post('/tags/find', { name, productID });
    return response.data;
}

export const createTag = (formValues) => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let productID;
    if (currentProduct) productID = currentProduct._id; else return;
    const response = await api.post('/tags/create', { ...formValues, productID });
    dispatch({type: CREATE_TAG, payload: response.data});
    return response.data;
}

export const retrieveTags = () => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let productID;
    if (currentProduct) productID = currentProduct._id; else return;
    const response = await api.post(`/tags/retrieve`, { productID });
    dispatch({type: RETRIEVE_TAGS, payload: response.data});
} 

export const deleteTag = (tag) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    let id = tag._id;
    const response = await api.delete(`/tags/delete/${id}`);
    dispatch({ type: DELETE_TAG, payload: response.data });
}

