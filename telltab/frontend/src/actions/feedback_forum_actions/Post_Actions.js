import {
    CREATE_POST,
    RETRIEVE_POSTS,
    DELETE_POST,
    EDIT_POST
} from './feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';




export const createPost = (formValues) => async dispatch => {
    const response = await api.post('/posts/create', formValues);
    dispatch({type: CREATE_POST, payload: response.data});
}

export const retrievePosts = (search) => async (dispatch, getState) => {
    console.log("Entered");
    const { forumState, bucketState } = getState();
    let forumID, bucketID;
    if (forumState.currentForum) forumID = forumState.currentForum._id;
    if (bucketState.currentBucket) bucketID = bucketState.currentBucket._id;
    const response = await api.post(`/posts/retrieve`);
    dispatch({type: RETRIEVE_POSTS, payload: response.data});
} 

