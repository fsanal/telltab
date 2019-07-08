import {
    CREATE_TIMEBLOCK,
    SELECT_TIMEBLOCK,
    DELETE_TIMEBLOCK,
    EDIT_TIMEBLOCK,
    GET_TIMEBLOCK
} from './roadmap_types';
import api from '../../apis/api';
import history from '../../history';


export const createTimeblock = (title, roadmapID, beginDate, endDate) => async dispatch => {
    const response = await api.post('/timeblocks/create', {title, roadmapID, beginDate, endDate});
    dispatch({type: CREATE_TIMEBLOCK, payload: response.data});
}

export const getTimeBlock = (id) => async (dispatch) => {
    const response = await api.post(`/timeblocks/get/${id}`);
    dispatch({ type: GET_TIMEBLOCK, payload: response.data });
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