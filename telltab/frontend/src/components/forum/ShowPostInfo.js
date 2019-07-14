import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments, createReply, selectComment } from '../../actions/global_actions/Comment_Actions';
import VModal from '../general/VModal';
import SingleField from '../general/SingleField';
import { Button, Form } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

class ShowPostInfo extends React.Component {

    renderTitle = () => {
        if (this.props.currentPost) return this.props.currentPost.title;
        return "";
    }

    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.forEach(tag => {
                return <h5>{tag}</h5>
            })
        }
    }

    renderPost = () => {
        if (this.props.currentPost) {
            const { title, body, author, tags } = this.props.currentPost;
            //console.log(tags);
            return (
                <div>
                    <h3>
                        {body}
                    </h3>
                    <h4>
                        {author}
                    </h4>
                    {this.renderTags()}
                </div>
            )
        }
        return (
            <div></div>
        )
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        )
    }

    commentSubmit = (formValues) => {
        this.props.createComment(formValues);
    }

    replySubmit = (formValues) => {
        this.props.createReply(formValues);
    }

    renderCommentInput = () => {
        return (
            <div>
                <SingleField onSubmit={this.props.handleSubmit(this.commentSubmit)} name={"content"}
                renderInput={this.renderInput} title={'Comment'} description={'Add a comment...'} submitText={'Post'}/>
            </div>
        );
    }

    //Replace with a CommentList.js?
    renderComments = () => {
        return (
            this.props.comments.map(comment => {
                return (

                    // CAN REPLY CORRECTLY BUT WEIRD FIELD POPULATE BUGS
                    <div>
                        <Button onClick={() => this.props.selectComment(comment)}>
                            {comment.content}
                        </Button>
                        <SingleField onSubmit={this.props.handleSubmit(this.replySubmit)} name={`content`}
                        renderInput={this.renderInput} title={''} description={'Add a reply...'} submitText={'Reply'}/>

                        {/* Why do they both have to be named content? */}

                        {/*<Form onSubmit={this.props.handleSubmit(this.commentSubmit)}>
                            <Field name="content" component={this.renderInput} />
                            <Button onClick={this.props.onHide} variant="primary" type="submit">Reply</Button>
                        </Form>*/}
                    </div>)
            })
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
                renderForm={this.renderPost()} renderFooter={this.renderAll()} />
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
    form: 'create_comment_form'
})(connect(mapStateToProps, { createComment, retrieveComments, createReply, selectComment })(ShowPostInfo))