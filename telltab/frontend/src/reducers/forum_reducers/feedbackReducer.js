import {
    CREATE_FEEDBACK,
    FETCH_FEEDBACKS,
    FETCH_FEEDBACK,
    DELETE_FEEDBACK,
    EDIT_FEEDBACK
} from '../../actions/feedback_forum_actions/feedback_forum_types';

import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_FEEDBACK:
            return { ...state, [action.payload.id] : action.payload};
        case FETCH_FEEDBACKS:
            console.log("WOOHOO");
            console.log(action.payload);
            console.log( _.mapKeys(action.payload, 'feedbackId'));
            return _.mapKeys(action.payload, 'feedbackId'); /*{ ...state, ..._.mapKeys(action.payload, 'id')};*/
        case FETCH_FEEDBACK:
            console.log("RATBOI");
            return { ...state, [action.payload.id] : action.payload};
        case EDIT_FEEDBACK:
            return { ...state, [action.payload.id] : action.payload};
        case DELETE_FEEDBACK:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
