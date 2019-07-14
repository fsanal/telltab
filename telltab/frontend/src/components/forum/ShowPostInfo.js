import React from 'react';
import { connect } from 'react-redux';
import { createComment, retrieveComments } from '../../actions/global_actions/Comment_Actions';
import VModal from '../general/VModal';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import { editPost, deletePostTag } from '../../actions/feedback_forum_actions/Post_Actions';
import { deleteTag} from '../../actions/global_actions/Tag_Actions';
class ShowPostInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            showForm: false
        }
    }

    componentDidMount() {
        this.props.retrieveComments(this.props.currentPost);
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
        const entries = Object.entries(this.props.comments);
        const values = Object.values(entries);
        for (const val of values) {
            return <div>{val[1].content}</div>;
        }
    }


    render() {
        return (
            <VModal show={this.props.show} onHide={this.props.onHide} title={this.renderTitle()}
                renderForm={this.renderBody()} />
        )
    }
}



const mapStateToProps = (state) => {
    return {
        currentPost: state.postState.currentPost,
        comments: state.commentState.comments
    }
}

export default reduxForm({
    form: 'show_post_form'
})(connect(mapStateToProps, { editPost, createComment, retrieveComments, deleteTag, deletePostTag })(ShowPostInfo))
