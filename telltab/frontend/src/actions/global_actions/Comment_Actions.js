import {
    CREATE_COMMENT,
    RETRIEVE_COMMENTS,
    SELECT_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../types/global_types';
import api from '../../apis/api';
import history from '../../history';

export const selectComment = (comment) => {
    return {
        type: SELECT_COMMENT,
        payload: comment
    }
}

//Add more functionality as touch different components i.e requirement, parent(merge)
export const retrieveComments = (post) => async (dispatch, getState) => {
    const { currentPost } = getState().postState;
    let postID, authorID;
    console.log("HERE: " + postID);
    if (currentPost) {
        postID = currentPost._id;
        authorID = currentPost.author;
    }
    const response = await api.post('/comments/retrieve', { postID, authorID });
    dispatch({type: RETRIEVE_COMMENTS, payload: response.data});
}

export const createComment = (formValues) => async (dispatch, getState) => {
    const { currentPost } = getState().postState;
    let postID;
    if (currentPost) postID = currentPost._id; else return;
    const response = await api.post('/comments/create', { ...formValues, postID });
    dispatch({ type: CREATE_COMMENT, payload: response.data });
}

export const editComment = (id, content) => async (dispatch, getState) => {
    const response = await api.put(`/comments/edit/${id}`, { content });
    dispatch({ type: EDIT_COMMENT, payload: response.data });
}

export const deleteComment = (comment) => async (dispatch, getState) => {
    let id = comment._id;
    const response = await api.delete(`/comments/delete/${id}`);
    dispatch({ type: DELETE_COMMENT, payload: id });
}

