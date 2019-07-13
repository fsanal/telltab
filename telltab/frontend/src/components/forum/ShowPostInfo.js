import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments } from '../../actions/global_actions/Comment_Actions';
import VModal from '../general/VModal';
import { Button, Form } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

class ShowPostInfo extends React.Component {

    componentDidMount() {
        this.props.retrieveComments(this.props.currentPost);
	}

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

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return(
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
        )
    }

    commentSubmit = (formValues) => {
        this.props.createComment(formValues);
    }

    renderCommentInput = () => {
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit(this.commentSubmit)}>
                    <Field name="content" component={this.renderInput} />
                    <Button onClick={this.props.onHide} variant="primary" type="submit">Post</Button>
                    <Button variant="outline-secondary">Cancel</Button>
                </Form>
            </div>
        );
    }

    //Replace with a CommentList.js?
    renderComments = () => {
        //rendering object but not text?
    }


    render() {
        return (
            <VModal show={this.props.show} onHide={this.props.onHide} title={this.renderTitle()}
                renderForm={this.renderPost()} renderCommentInput={this.renderCommentInput()} renderComments={this.renderComments()} />
        )
    }
}



const mapStateToProps = (state) => {
    return {
        currentPost: state.postState.currentPost,
        comments: Object.values(state.commentState.comments.content)
    }
}

export default reduxForm({
    form: 'create_comment_form'
})(connect(mapStateToProps, { createComment, retrieveComments })(ShowPostInfo))