import React from 'react';
import { signup } from '../../actions/authentication_actions/Local_Actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import history from '../../history';

class Signup extends React.Component {
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
        const promise = this.props.signup(formValues);
        promise.then((result) => {
            const success = result.success;
            if (success) {
                history.push('/');
            }
            else {
                console.log('Email already in use');
            }
        });
    }

    renderEmailInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return(
            <div className = {className}>
                <label>{label}</label>
                <input type="text" {...input} required/>
                {this.renderError(meta)}
            </div>
        );
    }

    renderPasswordInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return(
            <div className = {className}>
                <label>{label}</label>
                <input type="password" {...input} required/>
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        return (
            <div>
                <p>Signup</p>
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form">
                    <Field name = "email" component = {this.renderEmailInput} label = "Email" />
                    <Field name = "password" component = {this.renderPasswordInput} label = "Password" />
                    <button className = "ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'signup_form'
})(connect(null, { signup })(Signup));