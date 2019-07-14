import {
    CREATE_VOTE,
    GET_VOTE,
    DELETE_VOTE,
    RETRIEVE_VOTES
} from '../../actions/types/feedback_forum_types';

import _ from 'lodash';

const INITIAL_STATE = {
    votes: {}
}

export default ( state = INITIAL_STATE, action ) => {
    let { votes } = state;
    switch (action.type) {
        case CREATE_VOTE:
            votes[action.payload._id] = action.payload
            return { ...state, votes }
        case RETRIEVE_VOTES:
            return { ...state, votes : _.mapKeys(action.payload, '_id') }
        case DELETE_VOTE: 
            votes = _.omit(votes, action.payload._id);
            return { ...state, votes };
        default:
            return state;
    }
};