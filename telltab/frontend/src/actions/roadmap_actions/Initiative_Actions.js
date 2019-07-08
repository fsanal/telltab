import {
    CREATE_INITIATIVE,
    SELECT_INITIATIVE,
    DELETE_INITIATIVE,
    EDIT_INITIATIVE,
    RETRIEVE_INITIATIVES
} from './roadmap_types';
import api from '../../apis/api';
import history from '../../history';


export const createInitiative = (title, roadmapID) => async dispatch => {
    const response = await api.post('/initiatives/create', {title, roadmapID});
    dispatch({type: CREATE_INITIATIVE, payload: response.data});
}

export const retrieveInitiatives = (roadmapID, limit, skip) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.post('/initiatives/retrieve', { secret, roadmapID, limit, skip });
    dispatch({ type: RETRIEVE_INITIATIVES, payload: response.data });
}

export const editInitiative = (id, title, numReqs, roadmapID) => async dispatch => {
    const response = await api.put(`/initiatives/edit/${id}`, {title, numReqs, roadmapID});
    dispatch({type: EDIT_INITIATIVE, payload: response.data});
}

export const deleteInitiative = (id) => async dispatch => {
    const response = await api.delete(`/initiatives/delete/${id}`);
    dispatch({type: DELETE_INITIATIVE, payload: response.data});
}

export const selectInitiative = (initiative) => {
    return {
        type: SELECT_INITIATIVE,
        payload: initiative
    }
}