import {
    CREATE_POST,
    RETRIEVE_POSTS,
    SELECT_POST,
    DELETE_POST,
    EDIT_POST
} from '../types/feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';

export const selectPost = (post) => {
    return {
        type: SELECT_POST,
        payload: post
    }
}

export const createPost = (formValues) => async (dispatch, getState) => {
    const { title, body } = formValues;
    const { currentForum } = getState().forumState;
    const { currentBucket } = getState().bucketState;
    let forumID, bucketID;
    if (currentForum) forumID = currentForum._id;
    if (currentBucket) bucketID = currentBucket._id;
    const response = await api.post('/posts/create', { ...formValues, forumID, bucketID });
    dispatch({type: CREATE_POST, payload: response.data});
}

export const retrievePosts = (search) => async (dispatch, getState) => {
    const { forumState, bucketState } = getState();
    let forumID, bucketID;
    if (!forumState.currentForum) return history.push('/');
    forumID = forumState.currentForum._id;
    if (bucketState.currentBucket) bucketID = bucketState.currentBucket._id;
    console.log(forumID);
    console.log(bucketID);
    console.log(search);
    const response = await api.post(`/posts/retrieve`, {forumID, bucketID, search});
    dispatch({type: RETRIEVE_POSTS, payload: response.data});
} 

export const deletePost = (post) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    let id = post._id;
    const response = await api.delete(`/posts/delete/${id}`);
    dispatch({ type: DELETE_POST, payload: response.data });
}

