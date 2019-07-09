import {
    CREATE_ROADMAP,
    SELECT_ROADMAP,
    DELETE_ROADMAP,
    EDIT_ROADMAP,
    RETRIEVE_ROADMAPS
} from '../../actions/roadmap_actions/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentRoadmap: null,
    roadmaps: {}
}

export default ( state = INITIAL_STATE, action ) => {
    const {roadmaps, currentRoadmap} = state;
    switch (action.type) {
        case CREATE_ROADMAP:
            roadmaps[action.payload._id] = action.payload;
            return { ...state, roadmaps }
        case RETRIEVE_ROADMAPS:
            return { ...state, roadmaps : _.mapKeys(action.payload, '_id') }
        case SELECT_ROADMAP:
            return { ...state, currentRoadmap: action.payload }
        case EDIT_ROADMAP:
            roadmaps[action.payload._id] = action.payload;
            return { ...state, roadmaps }
        case DELETE_ROADMAP:
            return { ...state }
        default:
            return state;
    }
};