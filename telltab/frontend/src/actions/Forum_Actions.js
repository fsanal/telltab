import {
    CREATE_FORUM,
    GET_FORUM,
    DELETE_FORUM,
    EDIT_FORUM
} from './types';
import api from '../apis/api';
import history from '../history';


export const createForum = (name, productID, url) => async dispatch => {
    const response = await api.post('/forums/create', {name, productID, url});
    dispatch({type: CREATE_FORUM, payload: response.data});
}

export const getForum = (id) => async dispatch => {
    const response = await api.get(`/forums/get/${id}`);
    dispatch({type: GET_FORUM, payload: response.data});
} 

export const editForum = (id, name, productID) => async dispatch => {
    const response = await api.put(`/forums/edit/${id}`, {name, productID});
    dispatch({type: EDIT_FORUM, payload: response.data});
}

export const deleteForum = (id) => async dispatch => {
    const response = await api.delete(`/forums/delete/${id}`);
    dispatch({type: DELETE_FORUM, payload: response.data});
}