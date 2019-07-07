import {
    CREATE_BUCKET,
    GET_BUCKET,
    DELETE_BUCKET,
    EDIT_BUCKET
} from './types';
import api from '../apis/api';
import history from '../history';


export const createBucket = (name, forumID, url) => async dispatch => {
    const response = await api.post('/buckets/create', {name, forumID, url});
    dispatch({type: CREATE_BUCKET, payload: response.data});
}

export const getBucket = (id) => async dispatch => {
    const response = await api.get(`/buckets/get/${id}`);
    dispatch({type: GET_BUCKET, payload: response.data});
}

export const editBucket = (id, name, url) => async dispatch => {
    const response = await api.put(`/forums/edit/${id}`, {name, url});
    dispatch({type: EDIT_BUCKET, payload: response.data});
}

export const deleteBucket = (id) => async dispatch => {
    const response = await api.delete(`/forums/delete/${id}`);
    dispatch({type: DELETE_BUCKET, payload: response.data});
}