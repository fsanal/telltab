import {
    CREATE_INITIATIVE,
    SELECT_INITIATIVE,
    DELETE_INITIATIVE,
    EDIT_INITIATIVE,
    RETRIEVE_INITIATIVES
} from '../../actions/roadmap_actions/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentInitiative: null,
    initiatives: {}
}

export default ( state = INITIAL_STATE, action ) => {
    const {initiatives, currentInitiative} = state;
    switch (action.type) {
        case CREATE_INITIATIVE:
            initiatives[action.payload._id] = action.payload;
            return { ...state, initiatives }
        case RETRIEVE_INITIATIVES:
            return { ...state, initiatives : _.mapKeys(action.payload, '_id') }
        case SELECT_INITIATIVE:
            return { ...state, currentInitiative: action.payload }
        case EDIT_INITIATIVE:
            initiatives[action.payload._id] = action.payload;
            return { ...state, initiatives }
        case DELETE_INITIATIVE:
            return { ...state }
        default:
            return state;
    }
};