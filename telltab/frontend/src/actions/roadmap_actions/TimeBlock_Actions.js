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


export const createTimeblock = (formValues) => async dispatch => {
    let roadmapID = '5d2aa78707c8ebd794eefe3b' //constant for now because can't associate 
    const response = await api.post('/timeblocks/create', {...formValues, roadmapID});
    dispatch({type: CREATE_TIMEBLOCK, payload: response.data});
}

export const getTimeBlock = (id) => async (dispatch) => {
    const response = await api.post(`/timeblocks/get/${id}`);
    dispatch({ type: GET_TIMEBLOCK, payload: response.data });
}

export const retrieveTimeBlocks = () => async (dispatch, getState) => {
    const { roadmapState } = getState();
    let roadmapID;
    if (!roadmapState.currentRoadmap) return;
    roadmapID = roadmapState.currentRoadmap._id;
    const response = await api.post(`/timeblocks/retrieve`, {roadmapID });
    dispatch({type: RETRIEVE_TIMEBLOCKS, payload: response.data});
} 

export const editTimeblock = (id, title, beginDate, endDate) => async dispatch => {
    const response = await api.put(`/timeblocks/edit/${id}`, {title, beginDate, endDate});
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