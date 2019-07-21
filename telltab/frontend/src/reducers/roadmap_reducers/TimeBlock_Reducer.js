import {
    CREATE_TIMEBLOCK,
    SELECT_TIMEBLOCK,
    DELETE_TIMEBLOCK,
    EDIT_TIMEBLOCK,
    GET_TIMEBLOCK,
    RETRIEVE_TIMEBLOCKS
} from '../../actions/types/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentTimeBlock: null,
    timeblocks: {}
}

export default ( state = INITIAL_STATE, action ) => {
    let {timeblocks, currentTimeblock} = state;
    switch (action.type) {
        case CREATE_TIMEBLOCK:
            timeblocks[action.payload._id] = action.payload;
            return { ...state, timeblocks }
        case GET_TIMEBLOCK:
            return { ...state, timeblocks }
        case RETRIEVE_TIMEBLOCKS:
            return { ...state, timeblocks: _.mapKeys(action.payload, '_id') };
        case SELECT_TIMEBLOCK:
            return { ...state, currentTimeblock: action.payload }
        case EDIT_TIMEBLOCK:
            timeblocks[action.payload._id] = action.payload;
            return { ...state, timeblocks }
        case DELETE_TIMEBLOCK:
            currentTimeblock = null;
            timeblocks = _.omit(timeblocks, action.payload._id);
            return { ...state, timeblocks, currentTimeblock };
        default:
            return state;
    }
};