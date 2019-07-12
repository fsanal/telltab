import {
    CREATE_ROADMAP,
    GET_ROADMAP,
    DELETE_ROADMAP,
    EDIT_ROADMAP,
    SELECT_PRODUCT_ROADMAP,
} from '../types/roadmap_types';
import api from '../../apis/api';
import history from '../../history';


export const createRoadmap = (name) => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let name = currentProduct.name;
    let productID = currentProduct._id;
    const response = await api.post('/roadmaps/create', {name, productID});
    dispatch({type: CREATE_ROADMAP, payload: response.data});
}

export const getRoadmap = (id) => async dispatch => {
    const response = await api.get(`/roadmaps/get/${id}`);
    dispatch({type: GET_ROADMAP, payload: response.data});
}

export const getProductRoadmap = () => async (dispatch, getState) => {
    const { currentProduct } = getState().productState;
    let productID;
    if (currentProduct) productID = currentProduct._id;
    const response = await api.post(`/roadmaps/get_product_roadmap`, {productID});
    dispatch({type: SELECT_PRODUCT_ROADMAP, payload: response.data});
} 

export const editRoadmap = (id, name, productID, url) => async dispatch => {
    const response = await api.put(`/initiatives/edit/${id}`, {name, productID, url});
    dispatch({type: EDIT_ROADMAP, payload: response.data});
}

export const deleteRoadmap = (id) => async dispatch => {
    await api.delete(`/roadmaps/delete/${id}`);
    dispatch({type: DELETE_ROADMAP, payload: id});
}