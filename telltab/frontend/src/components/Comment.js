import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments, editComment, deleteComment, createReply, selectComment } from '../../actions/global_actions/Comment_Actions';
import VModal from '../general/VModal';
import SingleField from '../general/SingleField';
import { Button, Form } from 'react-bootstrap';
import { reduxForm, Field, reset } from 'redux-form';
import { editPost, deletePostTag } from '../../actions/feedback_forum_actions/Post_Actions';
import { deleteTag } from '../../actions/global_actions/Tag_Actions';
class ShowPostInfo extends React.Component {
    constructor() {
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
        console.log(tag);
        console.log("ENTERED HERE")
        this.props.deletePostTag(tag._id);
    }

    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.map(tag => {
                return (
                    <div>
                        <h4 key={tag._id}>{tag.name}</h4>
                        <Button onClick={() => this.handleDeleteTag(tag)}>delete tag</Button>
                    </div>
                )
            })
        }
    }

    onSubmit = (formValues) => {
        this.props.editPost(formValues);
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        )
    }

    renderForm = (title) => {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Title" />
                <Field name="body" component={this.renderInput} label="Body" />
                <Button onClick={this.props.onHide} variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }

    renderPost = () => {
        if (this.props.currentPost) {
            const { title, body, author, tags } = this.props.currentPost;
            if (this.state.showForm) {
                return (
                    <>
                        {this.renderForm(title)}
                    </>
                )
            } else {
                return (
                    <div>
                        <h3>
                            {body}
                        </h3>
                        <h4>
                            Author: George's Mom
                        </h4>
                        {this.renderTags()}
                    </div>
                )
            }
        } else {
            return (
                <div></div>
            )
        }
    }

    changeToForm() {
        this.setState((prevState) => ({
            showForm: !(prevState.showForm)
        }));
    }

    changeToProfile() {
        this.setState((prevState) => ({
            showForm: false
        }));
    }
    /*
        onHide(){
            {this.props.onHide};
            this.changeToProfile();
        }
    
        */
    renderEdit = () => {
        return (
            <Button onClick={() => { this.changeToForm() }}>Edit</Button>
        )
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        );
    }

    renderBody = () => {
        return (
            <>
                {this.renderPost()}
                {this.renderEdit()}
            </>
        )
    }

    //Comment Rendering

    commentSubmit = (formValues) => {
        this.props.createComment(formValues);
    }

    replySubmit = (formValues) => {
        this.props.createReply(formValues) //reset form after successful submit?
    }

    editCommentSubmit = (formValues) => {
        this.props.editComment(formValues);
    }

    renderCommentInput = () => {
        return (
            <div>
                <SingleField onSubmit={this.props.handleSubmit(this.commentSubmit)} name={"commentContent"}
                    renderInput={this.renderInput} title={'Comment'} submitText={'Post'} />
            </div>
        );
    }

    renderReplyInput(comment) {
        if (this.props.currentComment !== undefined && this.props.currentComment !== null) {
            if (this.props.currentComment._id == comment._id) {
                return (
                    <div>
                        <SingleField onSubmit={this.props.handleSubmit(this.replySubmit)} name={`replyContent`}
                            renderInput={this.renderInput} title={''} submitText={'Reply'} />
                    </div>
                )
            }
        }
    }

    renderEditInput(comment) {
        if (this.props.currentComment != undefined && this.props.currentComment != null) {
            if (this.props.currentComment._id == comment._id) {
                return (
                    <div>
                        <SingleField onSubmit={this.props.handleSubmit(this.editCommentSubmit)} name={`editContent`}
                            renderInput={this.renderInput} title={''} submitText={'Edit'} />
                    </div>
                )
            }
        }
    }

    //Make comments its own component

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


    renderComments = () => {
        const commentMap = this.orderComments(this.props.comments);
        let commentBlocks = [];
        let iterator = commentMap[Symbol.iterator]();
        for (let item of iterator) {
            commentBlocks.push(item[1]);
        }
        //console.log(commentBlocks);
        return (
            <div>
                {
                    commentBlocks.map(block => {
                        let temp = block.slice(1);
                        return (
                            <div>
                                <Button onClick={() => this.props.selectComment(block[0])}>
                                    {block[0].content}
                                </Button>
                                <Button onClick={() => this.props.selectComment(block[0])} variant="secondary" size="sm" >
                                    Edit
                                    {this.renderEditInput(block[0])}
                                </Button>
                                <Button onClick={() => this.props.deleteComment(block[0])} variant="secondary" size="sm">
                                    Delete
                                </Button>
                                {
                                    this.renderReplyInput(block[0])
                                }
                                {
                                    temp.map(comment => {
                                        return (
                                            <div>
                                                <hr></hr>
                                                <Button onClick={() => this.props.selectComment(comment)}>
                                                    {comment.content}
                                                </Button>
                                                <Button onClick={() => this.props.selectComment(comment)} variant="secondary" size="sm">
                                                    Edit
                                                    {this.renderEditInput(comment)}
                                                </Button>
                                                <Button onClick={() => this.props.deleteComment(comment)} variant="secondary" size="sm">
                                                    Delete
                                                </Button>
                                                {
                                                    this.renderReplyInput(comment)
                                                }
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

    renderAll() {
        return (
            <>
                <div>
                    {this.renderCommentInput()}
                </div>
                <br></br>
                <div>
                    {this.renderComments()}
                </div>
            </>
        );
    }

    render() {
        return (
            <VModal show={this.props.show} onHide={this.props.onHide} title={this.renderTitle()}
                renderForm={this.renderPost()} renderFooter={this.renderAll()} renderForm={this.renderBody()} />
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
    postForm: 'show_post_form'
})(connect(mapStateToProps, {
    editPost, createComment, retrieveComments, editComment, deleteComment,
    createReply, selectComment, deleteTag, deletePostTag
})(ShowPostInfo))
