import {
    CREATE_POST,
    FETCH_POSTS,
    FETCH_POST,
    DELETE_POST,
    EDIT_POST
} from './feedback_forum_types';
import api from '../../apis/api';
import history from '../../history';



export const fetchPost = (id) => async dispatch => {   

    const response = await api.get(`/posts/get/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data });
}

export const fetchPosts= (feedback_id) => {
    let trial_feedbacks = [{feedbackId : "1bo", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                        {feedbackId : "2ba", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                        {feedbackId : "3rat", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                        {feedbackId : "4abv", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                        {feedbackId : "5lab", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                        {feedbackId : "6iti", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju"}, 
                    ];
    var chosen_feedback = trial_feedbacks.filter(feedback => {
        return feedback.id.includes(feedback_id);
    });
    return {
        type: FETCH_POST ,
        payload: chosen_feedback
    }
}

