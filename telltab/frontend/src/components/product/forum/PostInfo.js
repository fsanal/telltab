import React from 'react';
import { connect } from 'react-redux';
import VModal from '../../general/VModal';
import Comment from '../../Comment';
import { reduxForm, Field } from 'redux-form';
import { editPost, deletePostTag } from '../../../actions/feedback_forum_actions/Post_Actions';
import { deleteTag } from '../../../actions/global_actions/Tag_Actions';
import styled, { keyframes } from "styled-components";


const CreateHeader = styled.div`
    font-size: 2.5rem;
    margin-top: 5rem;
    color:  #172B4D;
    font-weight: 600;
    padding-left: 1.35rem;
`

const StyledInput = styled.input`
    font-size: 4rem;
    width: 92rem;
    height: 6rem;
    border: none;
    padding: 2rem;
    padding-left: 1rem;
    border-radius: 0.5rem;
    color: #172B4D;
    :focus {
        border: solid 0.2rem #3c40c6;
        background-color: white;
        outline: none;
    }

    :hover {
        background-color: #F4F5F7;
    }

    :focus:hover {
        background-color:white;
    }
    word-wrap: break-word;
`

const StyledInput2 = styled.textarea`
    spellcheck="false";
    font-size: 2rem;
    width: 60rem;
    height: 10rem;
    border: none;
    padding: 1rem;
    margin-left: 0.4rem;
    border-radius: 0.5rem;
    color: #172B4D;
    resize: none;
    background-color: #F4F5F7;

    :focus {
        border: solid 0.2rem #3c40c6;
        outline: none;
        background-color: white;
    }

    :focus:hover {
        background-color:white;
    }
`

const InputHeader = styled.div`
    font-size: 2rem;
    font-weight: 600;
`
const InputContainer = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-top: ${props => props.marginTop};
`
//   <Button width = "10rem" >
   // <Button width = "8rem">
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
    margin-right: 3rem;
`

const LeftContainer = styled.div`
    width: 65rem;
    margin-top: 2rem;
`
const RightContainer = styled.div`
    margin-left: 3rem;
    width: 40rem;
`

const SplitContainer = styled.div`
    display: flex;
`

const AuthorContainer = styled.div`
    margin-left: 1rem;
    font-size: 2.5rem;
    height: 4rem;

    
`

const Author = styled.span`
    vertical-align: middle;
    line-height: 4rem;
    margin-left: 1rem;
    color: #172B4D;
`

const TagContainer = styled.div`
    margin-top: 1rem;
`

const TagSubContainer = styled.div`
    border: #DADCE0 1px solid;
    margin-right: 0.5rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 3rem;
    height: 3rem;
    margin-top: 1rem;
`

const Tag = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    
    display: inline-block;
    font-size: 2rem;
    text-align: center;
`
//Notes:
//Add borders to help visualize, think in boxes of vertical and horizontal, use padding for spacing, vertical-align: middle, different line heights

class PostInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            showForm: false
        }
    }

    renderTitle = () => {
        if (this.props.currentPost) return this.props.currentPost.title;
        return "";
    }

    handleDeleteTag = (tag) => {
        this.props.deletePostTag(tag._id);
    }

    /*
    <Button onClick = {() => this.handleDeleteTag(tag)}>X</Button>
    */
    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.map(tag => {
                return (
                    <TagSubContainer>
                        <Tag key = {tag._id}>{tag.name}</Tag>
                        <Button width = "2.3rem" height = "2.3rem" onClick = {() => this.handleDeleteTag(tag)}>X</Button>
                    </TagSubContainer>
                )
            })
        }
    }

    onSubmit = (formValues) => {
        this.props.onDismiss();
        this.props.editPost(formValues);
     }
 
     /*
     renderInput = ({input, label, meta}) => {
         return(
             <Form.Group>
                 <Form.Label>{label}</Form.Label>
                 <Form.Control {...input} type = "text" />
             </Form.Group>
         )
     }
 */
     renderForm = (title) => {
         return(
             <>
                 <InputContainer>
                    <StyledInput/>
                 </InputContainer>
                 
             </>
         )
     }

    renderPost = () => {
        if (this.props.currentPost){
            const {title, body, author, tags} = this.props.currentPost;
            if (this.state.showForm) {
                return(
                    <>
                        {this.renderForm(title)}
                    </>
                )
            } else {
                return(
                    <>
                        <Container>
                            <InputContainer marginTop = "2rem">
                                <StyledInput  spellCheck = "false" defaultValue = {title}/>
                            </InputContainer>
                            <SplitContainer>
                                <LeftContainer>
                                    <AuthorContainer>
                                        <i class="fas fa-user-circle"></i>
                                        <Author>George Bumass</Author>
                                    </AuthorContainer>
                                    <CreateHeader>Description:</CreateHeader>
                                    <InputContainer marginTop = "0.5rem">
                                        <StyledInput2 spellCheck = "false" type= "textarea" rows="1" cols="50" defaultValue = {body}/>
                                    </InputContainer>
                                    <Comment />
                                </LeftContainer>
                                <RightContainer>
                                    {this.renderTags()}
                                </RightContainer>
                            </SplitContainer>
                        </Container>
                    </>
                )
            } 
        } else {
            return (
                <div></div>
            )
        }
    }

    changeToForm(){
        this.setState((prevState) => ({
            showForm: !(prevState.showForm)
        }));
    }

    changeToProfile(){
        this.setState((prevState) => ({
            showForm: false
        }));
    }

    renderEdit = () => {
        return(
            <Button onClick = {() => {this.changeToForm()}}>Edit</Button>
        )
    }

    renderBody = () => {
        return(
            <>
                {this.renderPost()}
            </>
        )
    }

    render(){
        return(
            <>
                {this.renderBody()}
            </> 
        )
    }
}

    const mapStateToProps = (state) => {
        return {
            currentPost: state.postState.currentPost,
        }
    }
    
    export default reduxForm({
        form: 'show_post_form'
    })(connect(mapStateToProps, { editPost, deleteTag, deletePostTag })(PostInfo))