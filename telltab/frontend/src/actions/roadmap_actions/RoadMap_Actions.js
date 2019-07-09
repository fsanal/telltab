import {
    CREATE_ROADMAP,
    SELECT_ROADMAP,
    DELETE_ROADMAP,
    EDIT_ROADMAP,
    RETRIEVE_ROADMAPS
} from './roadmap_types';
import api from '../../apis/api';
import history from '../../history';


export const createRoadmap = (name, productID, url) => async dispatch => {
    const response = await api.post('/roadmaps/create', {name, productID, url});
    dispatch({type: CREATE_ROADMAP, payload: response.data});
}

export const retrieveRoadmaps = (limit, skip) => async (dispatch, getState) => {
    const { secret } = getState().auth;
    const response = await api.post('/roadmaps/retrieve', { secret, limit, skip });
    dispatch({ type: RETRIEVE_ROADMAPS, payload: response.data });
}

export const editRoadmap = (id, name, productID, url) => async dispatch => {
    const response = await api.put(`/initiatives/edit/${id}`, {name, productID, url});
    dispatch({type: EDIT_ROADMAP, payload: response.data});
}

export const deleteRoadmap = (id) => async dispatch => {
    const response = await api.delete(`/roadmaps/delete/${id}`);
    dispatch({type: DELETE_ROADMAP, payload: response.data});
}

export const selectRoadmap = (roadmap) => {
    return {
        type: SELECT_ROADMAP,
        payload: roadmap
    }
}