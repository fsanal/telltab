import {
    CREATE_COMMENT,
    SELECT_COMMENT,
    DELETE_COMMENT,
    RETRIEVE_COMMENTS
} from '../../actions/types/global_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentComment: null,
    comments: {}
}

export default ( state = INITIAL_STATE, action ) => {
    let {currentComment, comments} = state;
    switch (action.type) {
        case CREATE_COMMENT:
            comments[action.payload._id] = action.payload;
            return { ...state, comments };
        case RETRIEVE_COMMENTS:
            comments = _.mapKeys(action.payload, "_id");
            return { ...state, comments };
        case SELECT_COMMENT:
            currentComment = action.payload;
            return { ...state, currentComment };
        case DELETE_COMMENT:
            comments = _.omit(comments, action.payload._id);
            return { ...state, comments };
        default:
            return state;
    }
};