import {
    CREATE_POST,
    RETRIEVE_POSTS,
    DELETE_POST,
    EDIT_POST
} from '../../actions/feedback_forum_actions/feedback_forum_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentPost: null,
    posts: {}
}

export default (state = INITIAL_STATE, action) => {
    let { posts, currentPost} = state;
    switch (action.type) {
        case RETRIEVE_POSTS:
            return { ...state, posts: _.mapKeys(action.payload, '_id') };
        case CREATE_POST:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_POST:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}