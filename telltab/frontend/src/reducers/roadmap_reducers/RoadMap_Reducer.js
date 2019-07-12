import {
    CREATE_ROADMAP,
    GET_ROADMAP,
    DELETE_ROADMAP,
    EDIT_ROADMAP,
    SELECT_PRODUCT_ROADMAP
} from '../../actions/types/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentRoadmap: null
}

export default ( state = INITIAL_STATE, action ) => {
    let { currentRoadmap } = state;
    switch (action.type) {
        case CREATE_ROADMAP:
            return state;
        case GET_ROADMAP:
            return state;
        case EDIT_ROADMAP:
            currentRoadmap = action.payload[0];
            return { ...state, currentRoadmap };
        case SELECT_PRODUCT_ROADMAP:
            currentRoadmap = action.payload[0];
            return { ...state, currentRoadmap };
        case DELETE_ROADMAP:
            return state;
        default:
            return state;
    }
};