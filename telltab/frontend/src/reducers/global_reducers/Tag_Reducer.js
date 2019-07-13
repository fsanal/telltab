import {
    CREATE_TAG,
    SELECT_TAG,
    DELETE_TAG,
    RETRIEVE_TAGS
} from '../../actions/types/global_types';
import _ from 'lodash';

const INITIAL_STATE = {
    currentTag: null,
    tags: {}
}

export default ( state = INITIAL_STATE, action ) => {
    let {currentTag, tags} = state;
    switch (action.type) {
        case CREATE_TAG:
            tags[action.payload._id] = action.payload;
            return { ...state, tags };
        case RETRIEVE_TAGS:
            tags = _.mapKeys(action.payload, "_id");
            return { ...state, tags };
        case SELECT_TAG:
            currentTag = action.payload;
            return { ...state, currentTag };
        case DELETE_TAG:
            tags = _.omit(tags, action.payload._id);
            return { ...state, tags };
        default:
            return state;
    }
};