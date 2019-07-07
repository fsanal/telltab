import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import feedbackReducer from './feedbackReducer';
import productReducer from './Product_Reducer';

export default combineReducers({
    productState: productReducer,
    feedbacks: feedbackReducer
});