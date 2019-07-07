import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import feedbackReducer from './feedbackReducer';
import productReducer from './Product_Reducer';
import forumReducer from './Forum_Reducer';
import bucketReducer from './Bucket_Reducer';

export default combineReducers({
    productState: productReducer,
    feedbacks: feedbackReducer,
    forumState: forumReducer,
    bucketState: bucketReducer,
});