import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments, createReply, selectComment } from '../../actions/global_actions/Comment_Actions';
import VModal from '../general/VModal';
import SingleField from '../general/SingleField';
import { Button, Form } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { editPost, deletePostTag } from '../../actions/feedback_forum_actions/Post_Actions';
import { deleteTag} from '../../actions/global_actions/Tag_Actions';
class ShowPostInfo extends React.Component {
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
        console.log(tag);
        console.log("ENTERED HERE")
        this.props.deletePostTag(tag._id);
    }

    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.map(tag => {
                return (
                    <div>
                        <h4 key = {tag._id}>{tag.name}</h4>
                        <Button onClick = {() => this.handleDeleteTag(tag)}>delete tag</Button>
                    </div>
                )
            })
        }
    }

    onSubmit = (formValues) => {
        this.props.editPost(formValues);
     }
 
     renderInput = ({input, label, meta}) => {
         return(
             <Form.Group>
                 <Form.Label>{label}</Form.Label>
                 <Form.Control {...input} type = "text" />
             </Form.Group>
         )
     }
 
     renderForm = (title) => {
         return(
             <Form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                 <Field name = "title" component = {this.renderInput} label = "Title" />
                 <Field name = "body" component = {this.renderInput} label = "Body" />
                 <Button onClick = {this.props.onHide} variant="primary" type="submit">Submit</Button>
             </Form>
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
/*
    onHide(){
        {this.props.onHide};
        this.changeToProfile();
    }

    */
    renderEdit = () => {
        return(
            <Button onClick = {() => {this.changeToForm()}}>Edit</Button>
        )
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control {...input} type="text" />
            </Form.Group>
    }
    
    renderBody = () => {
        return(
            <>
                {this.renderPost()}
                {this.renderEdit()}
            </>
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
    form: 'show_post_form'
})(connect(mapStateToProps, { editPost, createComment, retrieveComments, createReply, selectComment, deleteTag, deletePostTag })(ShowPostInfo))
