import { combineReducers } from 'redux';

//global reducers
import productReducer from './global_reducers/Product_Reducer';
import authReducer from './global_reducers/Auth_Reducer';

//forum reducers
import feedbackReducer from './forum_reducers/feedbackReducer';
import forumReducer from './forum_reducers/Forum_Reducer';
import bucketReducer from './forum_reducers/Bucket_Reducer';

//roadmap reducers
import initiativeReducer from './roadmap_reducers/Initiative_Reducer';
import requirementReducer from './roadmap_reducers/Requirement__Reducer';
import roadmapReducer from './roadmap_reducers/RoadMap_Reducer';
import timeblockReducer from './roadmap_reducers/TimeBlock_Reducer';


import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    
    productState: productReducer,
    feedbacks: feedbackReducer,
    forumState: forumReducer,
    bucketState: bucketReducer,

    initiativeState: initiativeReducer,
    requirementState: requirementReducer,
    roadmapState: roadmapReducer,
    timeblockState: timeblockReducer
});