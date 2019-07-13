import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Login extends React.Component {
    onSubmit = (formValues) => {
        
    }

    renderEmailInput = ({input, label, meta}) => {
        
    }

    renderPasswordInput = ({input, label, meta}) => {
        
    }

    render() {
        return (
            <div>
                <p>Login</p>
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form">
                    <Field name = "name" component = {this.renderEmailInput} label = "Email" />
                    <Field name = "name" component = {this.renderEmailInput} label = "Password" />
                    <button className = "ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login_form'
})(connect());