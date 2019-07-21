import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createProduct } from '../../actions/global_actions/Product_Actions';
import { createForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { createRoadmap } from '../../actions/roadmap_actions/Roadmap_Actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from "styled-components";

const CreateHeader = styled.div`
    font-size: 4rem;
    margin-left: 3rem;
    margin-top: 2rem;
    color:  #172B4D;
    font-weight: 600;
`

const StyledInput = styled.input`

    font-size: 3rem;
    width: 55rem;
    height: 3.5rem;
    border: #DADCE0 solid 0.2rem;
    padding: 2rem;
    padding-left: 1.5rem;
    border-radius: 0.5rem;

    :focus {
        border: solid 0.2rem #3c40c6;
        outline: none;
    }
`
const InputHeader = styled.div`
    font-size: 2rem;
    font-weight: 600;
`
const InputContainer = styled.div`
    font-size: 2rem;
    margin-left: 3rem;
    margin-top: ${props => props.marginTop};
    font-weight: 600;
`

const Button = styled.button`
    background-color:#3c40c6;
    color: white;
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: 2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
        background-color:#575fcf;
    }
    :focus {
        outline: 0;
        box-shadow: none!important;
    }

`


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

    renderInput = ({input, label, meta, placeholder, marginTop}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return(
            <InputContainer marginTop = {`${marginTop}`}>
                <InputHeader>{label}</InputHeader>
                <StyledInput {...input} placeholder = {`${placeholder}`}/>
                {this.renderError(meta)}
            </InputContainer>
        )
    }
    
    onSubmit = (formValues) => {
        this.props.onDismiss();
        const promise = this.props.createProduct(formValues);
        promise.then((result) => {
            this.props.createForum();
            this.props.createRoadmap();
        })
    }



    render() {
        return (
            <>
                <CreateHeader>Create a Product</CreateHeader>
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className = "ui form error">
                    <Field marginTop = "4rem" name = "name" component = {this.renderInput} label = "Name" placeholder = "Enter product name" />
                    <Field marginTop = "2rem" name = "url" component = {this.renderInput} label = "Link" placeholder = "Enter product url"/>
                    <Button width = "10rem" marginTop = "3rem" marginLeft = "48rem" height = "4rem">Submit</Button>
                </form>
            </>
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
})(connect(null, { createProduct, createForum, createRoadmap })(CreateProduct))

