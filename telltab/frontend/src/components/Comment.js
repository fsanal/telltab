import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments, editComment, deleteComment, selectComment } from '../actions/global_actions/Comment_Actions';
import SingleField from '../components/general/SingleField';
import { Button, Form } from 'react-bootstrap';
import { reduxForm, Field, reset } from 'redux-form';
import styled from "styled-components";

/*********** Clean small form errors and display  *************/
// After posting clear field
// Make reply and edit popup
// Close field automatically on submit
// Make not look like a butthole
// Modularize so can use for other components besides Post (later)

//Styling
const CommentContainer = styled.div`
    width: 65rem;
    margin-top: 2rem;
}
`

const CommentHeader = styled.div`
    font-size: 2.5rem;
    margin-top: 5rem;
    color:  #172B4D;
    font-weight: 600;
    padding-left: 1.35rem;
`

const CommentListContainer = styled.div`
    display: flex;
    font-size: 3rem;
    margin-left: 2rem;
    margin-botton: 10rem;
`

const CommentInput = styled.div`
    display: flex;
    height: 5rem;
    margin-top: 6rem;
`

const AuthorContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    font-size: 1rem;
    height: 4rem;
`

const Author = styled.span`
    margin-left: 1rem;
    color: #172B4D;
`

const CommentField = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-top: ${props => props.marginTop};
`

const CommentForm = styled.div`
    display: flex;
    height: 5rem;
    margin-top: 3rem;
`

const StyledInputComment = styled.input`
    spellcheck="false";
    font-size: 2.5rem;
    width: 60rem;
    height: 5rem;
    border: none;
    padding: 1rem;
    margin-left: 2rem;
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

const CommentButton = styled.button`
    background-color:#3c40c6;
    color: white;
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: 2rem;
    border: 2px solid background-color;
    border-radius: 0.5rem;
    cursor: pointer;
    padding: 0.25em 1em;

    :hover {
        background-color:#575fcf;
    }
    :focus {
        outline: 0;
        box-shadow: none!important;
    }
`
const CommentCard = styled.div`
    font-size: 2.5rem;
    width: 30rem;
    height: 10rem;
    border: solid 0.2rem #3c40c6;
    padding: 1rem;
    margin-left: ${props => props.marginLeft};
    border-radius: 0.5rem;
    color: #172B4D;
    resize: none;
    background-color: #F4F5F7;
`

const ReplyCard = styled.div`
    font-size: 2.5rem;
    width: 30rem;
    height: 10rem;
    border: solid 0.2rem #3c40c6;
    padding: 1rem;
    margin-left: 2rem;
    border-radius: 0.5rem;
    color: #172B4D;
    resize: none;
    background-color: #F4F5F7;
`

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleReply = this.toggleReply.bind(this);
        this.state = {
            showEditComment: false,
            showReplyComment: false
        }
    }

    toggleEdit() {
        const currentEditState = this.state.showEditComment;
        this.setState({ showEditComment: !currentEditState });
    }

    toggleReply() {
        const currentReplyState = this.state.showReplyComment;
        this.setState({ showReplyComment: !currentReplyState });
    }

    renderInput = ({ input, label }) => {
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        )
    }

    commentSubmit = (formValues) => {
        this.props.createComment(formValues); //reset form after successful submit? cancel button?
    }

    editCommentSubmit = (formValues) => {
        this.props.editComment(formValues);
    }

    renderReplyInput(comment) {
        if (this.props.currentComment && this.props.currentComment._id == comment._id) {
            return (
                <div>
                    {
                        this.state.showReplyComment &&
                        <CommentForm>
                            <Field name="replyContent" component={this.renderInput} placeholder="Reply..." />
                            <CommentButton onClick={this.props.handleSubmit(this.commentSubmit)}>Reply</CommentButton>
                        </CommentForm>
                    }
                </div>
            )
        }
    }

    renderEditInput(comment) {
        if (this.props.currentComment && this.props.currentComment._id == comment._id) {
            return (
                <div>
                    {
                        this.state.showEditComment &&
                        <CommentForm>
                            <Field name="editContent" component={this.renderInput} placeholder="Edit comment..." />
                            <CommentButton onClick={this.props.handleSubmit(this.editCommentSubmit)}>Edit</CommentButton>
                        </CommentForm>
                    }
                </div>
            )
        }
    }

    orderComments(comments) {
        let newComments = new Map();
        comments.forEach(comment => {
            if (!comment.parent) {
                newComments.set(comment._id, [comment]);
            } else {
                if (newComments.has(comment.parent._id)) {
                    let value = newComments.get(comment.parent._id);
                    value.push(comment);
                    newComments.set(comment.parent._id, value);
                } else {
                    newComments.set(comment.parent._id, [comment]);
                }
            }
        })
        return newComments;
    }


    renderCommentList = () => {
        const commentMap = this.orderComments(this.props.comments);
        let commentBlocks = [];
        let iterator = commentMap[Symbol.iterator]();
        for (let item of iterator) {
            commentBlocks.push(item[1]);
        }
        return (
            <div>
                {
                    commentBlocks.map(block => {
                        let temp = block.slice(1);
                        return (
                            <div>
                                <CommentCard marginLeft = "2rem">
                                    {block[0].content}
                                    <Button onClick={() => { this.props.selectComment(block[0]); this.toggleReply(); }}>
                                        Reply
                                    </Button>
                                    <Button onClick={() => { this.props.selectComment(block[0]); this.toggleEdit(); }} >
                                        Edit
                                    </Button>
                                    <Button onClick={() => this.props.deleteComment(block[0])}>
                                        Delete
                                    </Button>
                                    {(this.state.showReplyComment) ? this.renderReplyInput(block[0]) : <></>}
                                    {(this.state.showEditComment) ? this.renderEditInput(block[0]) : <></>}
                                </CommentCard>
                                {
                                    temp.map(comment => {
                                        return (
                                            <div>
                                                <hr></hr>
                                                <CommentCard marginTop = "6rem">
                                                    {comment.content}
                                                    <Button onClick={() => { this.props.selectComment(comment); this.toggleReply(); }}>
                                                        Reply
                                                    </Button>
                                                    <Button onClick={() => { this.props.selectComment(comment); this.toggleEdit(); }} >
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => this.props.deleteComment(comment)}>
                                                        Delete
                                                    </Button>
                                                    {(this.state.showReplyComment) ? this.renderReplyInput(comment) : <></>}
                                                    {(this.state.showEditComment) ? this.renderEditInput(comment) : <></>}
                                                </CommentCard>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    /*renderInput = ({ input, placeholder }) => {
        return (
            <CommentField>
                <StyledInputComment {...input} placeholder={`${placeholder}`} />
            </CommentField>
        )
    }*/

    renderForm = () => {
        return (
            <CommentForm>
                <Field name="content" component={this.renderInput} placeholder="Add a comment..." />
                <CommentButton onClick={this.props.handleSubmit(this.commentSubmit)}>Post</CommentButton>
            </CommentForm>
        )
    }

    renderComments() {
        return (
            <>
                <CommentContainer>
                    <CommentHeader>
                        Comments
                    </CommentHeader>

                    <CommentListContainer>
                        {this.renderCommentList()}
                    </CommentListContainer>

                    <CommentInput>
                        <AuthorContainer>
                            <i class="fas fa-user-circle"></i>
                        </AuthorContainer>
                        {this.renderForm()}
                    </CommentInput>
                </CommentContainer>
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderComments()}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentComment: state.commentState.currentComment,
        currentPost: state.postState.currentPost,
        comments: Object.values(state.commentState.comments)
    }
}

export default reduxForm({
    form: 'create_comment_form',
})(connect(mapStateToProps, {
    createComment, retrieveComments, editComment, deleteComment, selectComment
})(Comment))