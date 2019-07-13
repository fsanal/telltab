import React from 'react';
import { connect } from 'react-redux';
import VModal from '../general/VModal';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import { editPost } from '../../actions/feedback_forum_actions/Post_Actions';

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

    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.map(tag => {
                return <h5 key = {tag}>{tag}</h5>
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
                            {author}
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
            showForm: true
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

    render(){
        return(
           < VModal show = {this.props.show} onHide = {this.props.onHide} title = {this.renderTitle()} renderForm = {this.renderPost()} renderFooter = {this.renderEdit()}/>
        )
    }   
}



const mapStateToProps = (state) => {
    return {
        currentPost: state.postState.currentPost
    }
}

export default reduxForm({
    form: 'edit_post_form'
})(connect(mapStateToProps, { editPost })(ShowPostInfo))

