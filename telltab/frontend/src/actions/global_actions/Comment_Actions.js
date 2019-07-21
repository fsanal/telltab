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
export const retrieveComments = () => async (dispatch, getState) => {
    const { currentPost } = getState().postState;
    let postID;
    if (currentPost) postID = currentPost._id;
    const response = await api.post('/comments/retrieve', { postID });
    dispatch({type: RETRIEVE_COMMENTS, payload: response.data});
}

export const createComment= (formValues) => async (dispatch, getState) => {
    const { currentPost } = getState().postState;
    const { currentComment } = getState().commentState;
    const { currentAuthor } = getState().auth;
    let authorID, postID, parentID;
    if (currentAuthor) authorID = currentAuthor.userId; //change later
    if (currentPost) postID = currentPost._id;
    if (currentComment) {
        delete Object.assign(formValues, {['content']: formValues['replyContent'] })['replyContent'];
        if (!currentComment.parent) {
            parentID = currentComment._id;
        } else {
            parentID = currentComment.parent._id;
        }
    }
    const response = await api.post('/comments/create', { ...formValues, authorID, postID, parentID});
    dispatch({ type: CREATE_COMMENT, payload: response.data });
}

export const editComment = (formValues) => async (dispatch, getState) => {
    const { currentComment } = getState().commentState;
    if (!currentComment) return;
    delete Object.assign(formValues, {['content']: formValues['editContent'] })['editContent'];
    let id = currentComment._id;
    const response = await api.put(`/comments/edit/${id}`, { ...formValues });
    dispatch({ type: EDIT_COMMENT, payload: response.data });
}

export const deleteComment = (comment) => async (dispatch) => {
    let id = comment._id;
    const response = await api.delete(`/comments/delete/${id}`);
    dispatch({ type: DELETE_COMMENT, payload: response.data });
}

