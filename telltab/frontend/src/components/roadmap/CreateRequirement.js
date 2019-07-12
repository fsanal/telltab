import React from 'react';
import history from '../../history';
import { createRequirement } from '../../actions/roadmap_actions/Requirement_Actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CreateRequirement extends React.Component {

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
        this.props.createRequirement(formValues);
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
                <Field name = "beginDate" component = {this.renderInput} label = "Start Date" />
                <Field name = "endDate" component = {this.renderInput} label = "Due Date" />
                <button className = "ui button primary">Create Requirement</button>
            </form>
        )
    }   
}

//Needs title string validation, start and end date logic validation
/*const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
        errors.title = 'Name is invalid';
    }
    return errors;
}*/


export default reduxForm({
    form: 'create_requirement_form',
    //validate
})(connect(null, { createRequirement })(CreateRequirement))
