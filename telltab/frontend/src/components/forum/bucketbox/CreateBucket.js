import React from 'react';
import history from '../../../history';
import { createBucket } from '../../../actions/feedback_forum_actions/Bucket_Actions';
import { retrievePosts } from '../../../actions/feedback_forum_actions/Post_Actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CreateBucket extends React.Component {

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
        const promise = this.props.createBucket(formValues);
        promise.then((result) => {this.props.retrievePosts()})
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
        console.log("RENDERING");
        return(
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form">
                <Field name = "name" component = {this.renderInput} label = "Bucket Name" />
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
    form: 'create_bucket_form'
})(connect(null, { createBucket, retrievePosts })(CreateBucket))
