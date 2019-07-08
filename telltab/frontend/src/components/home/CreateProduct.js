import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createProduct } from '../../actions/Product_Actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CreateProduct extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className = "ui error message">
                    <div className = "header">{error}</div>
                </div>
            )
        }
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
    
    onSubmit = (formValues) => {
        console.log("CLICKED");
        this.props.createProduct(formValues);
    }

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form error">
                <Field name = "name" component = {this.renderInput} label = "Product Name" />
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
    form: 'create_product_form',
    validate
})(connect(null, { createProduct })(CreateProduct))

