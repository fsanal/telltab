import {
    CREATE_REQUIREMENT,
    SELECT_REQUIREMENT,
    DELETE_REQUIREMENT,
    EDIT_REQUIREMENT,
    GET_REQUIREMENT,
    ADD_REQUIREMENT_VISIBILITY,
    REMOVE_REQUIREMENT_VISIBILITY,
    ADD_REQUIREMENT_TAG,
    DELETE_REQUIREMENT_TAG,
    ADD_REQUIREMENT_ASSIGNMENT,
    DELETE_REQUIREMENT_ASSIGNMENT,
    CREATE_REQUIREMENT_CUSTOMFIELD,
    DELETE_REQUIREMENT_CUSTOMFIELD,
    RETRIEVE_REQUIREMENTS
} from '../../actions/roadmap_actions/roadmap_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentRequirement: null,
    requirements: {}
}

export default ( state = INITIAL_STATE, action ) => {
    const {requirements, currentRequirement} = state;
    switch (action.type) {
        case CREATE_REQUIREMENT:
            requirements[action.payload._id] = action.payload;
            return { ...state, requirements }
        case RETRIEVE_REQUIREMENTS:
            return { ...state, requirements : _.mapKeys(action.payload, '_id') }
        case SELECT_REQUIREMENT:
            return { ...state, currentRequirement: action.payload }
        case EDIT_REQUIREMENT:
            requirements[action.payload._id] = action.payload;
            return { ...state, requirements }
        case DELETE_REQUIREMENT:
            return { ...state }
        default:
            return state;
            //finish the rest 7/8 and test
    }
};