import React from 'react';
import history from '../../history';
import { createPost } from '../../actions/feedback_forum_actions/Post_Actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import VModal from '../general/VModal';

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
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        )
    }

    renderForm = () => {
        return(
            <Form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                <Field name = "title" bogus = "Title" component = {this.renderInput} label = "Title" />
                <Field name = "body" component = {this.renderInput} label = "Body" />
                <Button onClick = {this.props.onHide} variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }


    render(){
        return(
           < VModal show = {this.props.show} onHide = {this.props.onHide} title = "Create Post" renderForm = {this.renderForm()} />
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
