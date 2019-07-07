import {
    CREATE_FORUM,
    GET_FORUM,
    DELETE_FORUM,
    EDIT_FORUM
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentForum: null
}

export default ( state = INITIAL_STATE, action ) => {
    let {currentForum} = state;
    switch (action.type) {
        case CREATE_FORUM:
            return state;
        case GET_FORUM:
            return state;
        case EDIT_FORUM:
            currentForum = action.payload;
            return { ...state, currentForum };
        default:
            return state;
    }
};