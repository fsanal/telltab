import React from 'react';
import history from '../../history';
import { createTag, findTag } from '../../actions/global_actions/Tag_Actions';
import { addPostTag } from '../../actions/feedback_forum_actions/Post_Actions'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import VModal from '../general/VModal';

class AddTag extends React.Component {

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
       this.props.findTag(formValues.name).then((result) => {
           if (result) {
               console.log("TAG ID:")
               console.log("result._id");
               this.props.addPostTag(result._id);
           } else {
               this.props.createTag(formValues).then((result2) => {
                   this.props.addPostTag(result2._id);
               })
           }
       });
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
                <Field name = "name" component = {this.renderInput} label = "Title" />
                <Button onClick = {this.props.onHide} variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }


    render(){
        return(
           < VModal show = {this.props.show} onHide = {this.props.onHide} title = "Add Tag" renderForm = {this.renderForm()} />
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
})(connect(null, { createTag, findTag, addPostTag })(AddTag))
