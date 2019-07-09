import React from 'react';
import history from '../../history';
import { createPost } from '../../actions/feedback_forum_actions/Post_Actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CreatePost extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className = "ui error message">
                    <div className = "header">{error}</div>
                </div>
            )
        }
    }

    onSubmit = (formValues) => {
        this.props.createPost(formValues);
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return(
            <div className = {className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        )
    }


    render(){
        return(
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form">
                <Field name = "title" component = {this.renderInput} label = "Title" />
                <Field name = "body" component = {this.renderInput} label = "Body" />
                <button className = "ui button primary">Submit</button>
            </form>
        )
    }   
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
        errors.title = 'Name is invalid';
    }
    return errors;
}


export default reduxForm({
    form: 'create_post_form'
})(connect(null, { createPost })(CreatePost))
