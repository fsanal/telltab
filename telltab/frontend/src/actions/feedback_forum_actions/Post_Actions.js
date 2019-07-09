import {
    CREATE_POST,
    RETRIEVE_POSTS,
    SELECT_POST,
    DELETE_POST,
    EDIT_POST
} from './feedback_forum_types';
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
    let forumID;
    if (currentForum) forumID = currentForum._id;
    const response = await api.post('/posts/create', { ...formValues, forumID });
    dispatch({type: CREATE_POST, payload: response.data});
    history.push('/home');
}

export const retrievePosts = (search) => async (dispatch, getState) => {
    const { forumState, bucketState } = getState();
    console.log(forumState);
    let forumID, bucketID;
    if (forumState.currentForum) forumID = forumState.currentForum._id;
    if (bucketState.currentBucket) bucketID = bucketState.currentBucket._id;
    const response = await api.post(`/posts/retrieve`, {forumID, bucketID});
    dispatch({type: RETRIEVE_POSTS, payload: response.data});
} 

