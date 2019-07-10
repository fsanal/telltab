import {
    CREATE_TIMEBLOCK,
    SELECT_TIMEBLOCK,
    DELETE_TIMEBLOCK,
    EDIT_TIMEBLOCK,
    GET_TIMEBLOCK
} from '../../actions/types/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentTimeblock: null,
    timeblocks: {}
}

export default ( state = INITIAL_STATE, action ) => {
    const {timeblocks, currentTimeblock} = state;
    switch (action.type) {
        case CREATE_TIMEBLOCK:
            timeblocks[action.payload._id] = action.payload;
            return { ...state, timeblocks }
        case GET_TIMEBLOCK:
            return { ...state, timeblocks } //test
        case SELECT_TIMEBLOCK:
            return { ...state, currentTimeblock: action.payload }
        case EDIT_TIMEBLOCK:
            timeblocks[action.payload._id] = action.payload;
            return { ...state, timeblocks }
        case DELETE_TIMEBLOCK:
            return { ...state }
        default:
            return state;
    }
};