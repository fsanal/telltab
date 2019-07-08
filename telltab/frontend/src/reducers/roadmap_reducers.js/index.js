import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import initiativeReducer from './Initiative_Reducer';
import requirementReducer from './Requirement__Reducer';
import roadmapReducer from './RoadMap_Reducer';
import timeblockReducer from './TimeBlock_Reducer';

export default combineReducers({
    initiativeState: initiativeReducer,
    requirementState: requirementReducer,
    roadmapState: roadmapReducer,
    timeblockState: timeblockReducer
});