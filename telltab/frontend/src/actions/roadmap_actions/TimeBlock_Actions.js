import {
    CREATE_TIMEBLOCK,
    SELECT_TIMEBLOCK,
    DELETE_TIMEBLOCK,
    EDIT_TIMEBLOCK,
    GET_TIMEBLOCK,
    RETRIEVE_TIMEBLOCKS
} from '../types/roadmap_types';
import api from '../../apis/api';
import history from '../../history';


export const createTimeblock = (formValues) => async (dispatch, getState) => {
    const { roadmapState } = getState();
    let roadmapID;
    if (!roadmapState.currentRoadmap) return;
    roadmapID = roadmapState.currentRoadmap._id;
    //console.log("Created " + roadmapID);
    const response = await api.post('/timeblocks/create', {...formValues, roadmapID});
    dispatch({type: CREATE_TIMEBLOCK, payload: response.data});
}

export const getTimeblock = (id) => async (dispatch) => {
    const response = await api.post(`/timeblocks/get/${id}`);
    dispatch({ type: GET_TIMEBLOCK, payload: response.data });
}

export const retrieveTimeblocks = () => async (dispatch, getState) => {
    const { roadmapState } = getState();
    let roadmapID;
    if (!roadmapState.currentRoadmap) return;
    roadmapID = roadmapState.currentRoadmap._id;
    //console.log(roadmapID);
    const response = await api.post('/timeblocks/retrieve', {roadmapID});
    dispatch({type: RETRIEVE_TIMEBLOCKS, payload: response.data});
} 

export const editTimeblock = (formValues) => async (dispatch, getState) => {
    const { currentTimeblock } = getState().timeblockState;
    let id = currentTimeblock._id;
    const response = await api.put(`/timeblocks/edit/${id}`, { ...formValues });
    dispatch({type: EDIT_TIMEBLOCK, payload: response.data});
}

export const deleteTimeblock = (id) => async dispatch => {
    const response = await api.delete(`/timeblocks/delete/${id}`);
    dispatch({type: DELETE_TIMEBLOCK, payload: response.data});
}

export const selectTimeblock = (timeblock) => {
    return {
        type: SELECT_TIMEBLOCK,
        payload: timeblock
    }
}