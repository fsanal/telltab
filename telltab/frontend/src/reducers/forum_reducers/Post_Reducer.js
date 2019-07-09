import {
    CREATE_POST,
    RETRIEVE_POSTS,
    SELECT_POST,
    DELETE_POST,
    EDIT_POST
} from '../../actions/feedback_forum_actions/feedback_forum_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentPost: null,
    posts: {},
    selectedPosts: {}
}

export default (state = INITIAL_STATE, action) => {
    let { posts, currentPost, selectedPosts} = state;
    switch (action.type) {
        case RETRIEVE_POSTS:
            return { ...state, posts: _.mapKeys(action.payload, '_id') };
        case CREATE_POST:
            posts[action.payload._id] = action.payload
            return { ...state, posts };
        case EDIT_POST:
            posts[action.payload._id] = action.payload
            return { ...state, posts };
        case DELETE_POST:
            return _.omit(state, action.payload);
        case SELECT_POST:
            let post = action.payload;
            if (!(selectedPosts.hasOwnProperty(post._id))) {
                console.log("ENTERED HERE -- doesn't have it")
                selectedPosts[post._id] = post;
                return {...state, selectedPosts};
            } else {
                console.log("ENTERED HERE -- does have it")
                selectedPosts = _.omit(selectedPosts, post._id)
                return {...state, selectedPosts};
            }
        default:
            return state;
    }
}