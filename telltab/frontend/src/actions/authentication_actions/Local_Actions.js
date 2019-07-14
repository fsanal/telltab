import {
    LOCAL_LOGIN,
    LOCAL_SIGNUP,
    LOCAL_LOGOUT
} from '../types/authentication_types';
import api from '../../apis/api';
import history from '../../history';

export const login = (formValues) => async dispatch => {
    const response = await api.post('/authenticate/login', {...formValues});
    dispatch({type: LOCAL_LOGIN, payload: response.data});
    return response.data;
}

export const logout = () => async dispatch => {
    const response = await api.get('/authenticate/logout');
    dispatch({type: LOCAL_LOGOUT, payload: response.data});
    return response.data;
}