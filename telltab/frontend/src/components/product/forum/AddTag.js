import React from 'react';
import history from '../../../history';
import { createTag, findTag } from '../../../actions/global_actions/Tag_Actions';
import { addPostTag } from '../../../actions/feedback_forum_actions/Post_Actions'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from '../../general/Modal';
import styled from "styled-components";
import { withRouter } from 'react-router';


const TagHeader = styled.div`
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
        let productID = this.props.match.params.productID;    
        this.props.onDismiss();
        this.props.findTag(productID, formValues).then((result) => {
           if (!result) {
               this.props.createTag(productID, formValues).then((result2) => {
                   this.props.addPostTag(result2._id);
               })
           }
       });
    }



    renderInput = ({input, label, meta, marginTop, placeholder}) => {
        return(
            <InputContainer marginTop = {`${marginTop}`}>
                <InputHeader>{label}</InputHeader>
                <StyledInput {...input} placeholder = {`${placeholder}`}/>
            </InputContainer>
        )
    }

    renderForm = () => {
        return(
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                <Field marginTop = "4rem" name = "name" component = {this.renderInput} label = "Tag" placeholder = "Enter tag" />
                <Button width = "10rem" marginTop = "3rem" marginLeft = "48rem" height = "4rem">Submit</Button>
            </form>
        )
    }

    render(){
        return(
            <>
                <Modal height = "40rem" width = "65rem" renderContent = {this.renderForm()} show = {this.props.show} onDismiss = {this.props.onDismiss}/>
            </>
        )
    }
}


export default withRouter(reduxForm({
    form: 'create_tag_form'
})(connect(null, { createTag, findTag, addPostTag })(AddTag)))




