import {
    CREATE_BUCKET,
    GET_BUCKET,
    DELETE_BUCKET,
    EDIT_BUCKET,
    RETRIEVE_BUCKETS,
    SELECT_BUCKET
} from '../types/feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';


export const createBucket = (formValues) => async (dispatch, getState) => {
    const { currentForum } = getState().forumState;
    if (!currentForum) return alert("Current forum not set -- ongoing bug");
    let forumID = currentForum._id
    const response = await api.post('/buckets/create', {...formValues, forumID});
    dispatch({type: CREATE_BUCKET, payload: response.data});
    history.goBack();
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

export const selectBucket = (bucket) => {
    return {
        type: SELECT_BUCKET,
        payload: bucket
    }
}

export const retrieveBuckets = () => async (dispatch, getState) => {
    const { forumState } = getState();
    let forumID;
    if (!forumState.currentForum) return;
    forumID = forumState.currentForum._id;
    const response = await api.post(`/buckets/retrieve`, {forumID });
    dispatch({type: RETRIEVE_BUCKETS, payload: response.data});
} 
