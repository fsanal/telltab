























import {
    CREATE_FEEDBACK,
    FETCH_FEEDBACKS,
    FETCH_FEEDBACK,
    DELETE_FEEDBACK,
    EDIT_FEEDBACK
} from './forum_types';
import axios from 'axios';
import history from '../../history';



export const fetchFeedbacks = () => {   
    let trial_feedbacks = [{name: "Baiju", feedbackId : "1bo", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                       {name: "Baiju", feedbackId : "2ba", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                       {name: "Baiju", feedbackId : "3rat", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                       {name: "Baiju", feedbackId : "4abv", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                       {name: "Baiju", feedbackId : "5lab", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                       {name: "Baiju", feedbackId : "6iti", title: "Need Bugs Fixed", content: "There's an error with your map module", userId: "Baiju", votes: "8"}, 
                 ];
    console.log(trial_feedbacks);
    return {
        type: FETCH_FEEDBACKS,
        payload: trial_feedbacks
    } 
}

export const fetchFeedback = (feedback_id) => {
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
        type: FETCH_FEEDBACK ,
        payload: chosen_feedback
    }
}

