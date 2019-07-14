import {
    CREATE_VOTE,
    GET_VOTE,
    DELETE_VOTE,
    RETRIEVE_VOTES
} from '../types/feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';

export const createVote = (post) => async (dispatch, getState) => {
    console.log("Am i called?")
    const { userID } = getState().auth;
    const { currentForum } = getState().forumState
    let forumID;
    if (currentForum) forumID = currentForum._id;
    let postID = post._id;
    const response = await api.post('/votes/create', { userID, postID, forumID });
    dispatch({type: CREATE_VOTE, payload: response.data});
}

export const retrieveVotes = () => async (dispatch, getState) => {
    const { userID } = getState().auth;
    const response = await api.post('/votes/retrieve', { userID });
    dispatch({type: RETRIEVE_VOTES, payload: response.data});
} 


export const deleteVote = (vote) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    let id = vote._id
    const response = await api.delete(`/votes/delete/${id}`);
    dispatch({ type: DELETE_VOTE, payload: response.data });
}
