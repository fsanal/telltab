import {
    CREATE_BUCKET,
    GET_BUCKET,
    DELETE_BUCKET,
    EDIT_BUCKET
} from '../../actions/feedback_forum_actions/feedback_forum_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentBucket: null,
    buckets: null
}

export default ( state = INITIAL_STATE, action ) => {
    let {currentBucket, buckets} = state;
    switch (action.type) {
        case CREATE_BUCKET:
            buckets[action.payload._id] = action.payload;
            return { ...state, buckets }
        case GET_BUCKET:
            return { ...state, currentBucket};
        case EDIT_BUCKET:
            currentBucket = action.payload;
            return { ...state, currentBucket };
        default:
            return state;
    }
};