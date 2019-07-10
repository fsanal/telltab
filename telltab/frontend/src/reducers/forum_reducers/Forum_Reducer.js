import {
    CREATE_FORUM,
    GET_FORUM,
    DELETE_FORUM,
    EDIT_FORUM,
    SELECT_PRODUCT_FORUM
} from '../../actions/feedback_forum_actions/feedback_forum_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentForum: null
}

export default ( state = INITIAL_STATE, action ) => {
    let {currentForum} = state;
    switch (action.type) {
        case CREATE_FORUM:
            return state;
        case GET_FORUM:
            return state;
        case EDIT_FORUM:
            currentForum = action.payload[0];
            return { ...state, currentForum };
        case SELECT_PRODUCT_FORUM:
            currentForum = action.payload[0];
            console.log(currentForum);
            return { ...state, currentForum };
        default:
            return state;
    }
};