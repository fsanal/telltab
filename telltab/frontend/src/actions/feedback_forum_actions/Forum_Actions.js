import {
    CREATE_FORUM,
    GET_FORUM,
    SELECT_PRODUCT_FORUM,
    DELETE_FORUM,
    EDIT_FORUM
} from './feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';


export const createForum = (name, ) => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let name = currentProduct.name;
    let productID = currentProduct._id;
    const response = await api.post('/forums/create', {name, productID});
    dispatch({type: CREATE_FORUM, payload: response.data});
}

export const getForum = (id) => async dispatch => {
    const response = await api.get(`/forums/get/${id}`);
    dispatch({type: GET_FORUM, payload: response.data});
} 

export const getProductForum = () => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let productID = currentProduct._id;
    const response = await api.post(`/forums/get_product_forum`, {productID});
    dispatch({type: SELECT_PRODUCT_FORUM, payload: response.data});
} 


export const editForum = (id, name, productID) => async dispatch => {
    const response = await api.put(`/forums/edit/${id}`, {name, productID});
    dispatch({type: EDIT_FORUM, payload: response.data});
}

export const deleteForum = (id) => async dispatch => {
    const response = await api.delete(`/forums/delete/${id}`);
    dispatch({type: DELETE_FORUM, payload: response.data});
}