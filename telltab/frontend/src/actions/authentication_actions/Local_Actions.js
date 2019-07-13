import {
    LOCAL_LOGIN,
    LOCAL_SIGNUP,
    LOCAL_LOGOUT
} from '../types/authentication_types';
import api from '../../apis/api';
import history from '../../history';

export const login = (formValues) => async dispatch => {
    // const { currentForum } = getState().forumState;
    // if (!currentForum) return alert("Current forum not set -- ongoing bug");
    // let forumID = currentForum._id
    // const response = await api.post('/buckets/create', {...formValues, forumID});
    // dispatch({type: CREATE_BUCKET, payload: response.data});
    // history.goBack();

    const response = await api.post('/authenticate/login', {...formValues});
    dispatch({type: LOCAL_LOGIN, payload: response.data});
    return response.data;
}