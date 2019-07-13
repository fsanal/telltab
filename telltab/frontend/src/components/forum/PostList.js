import React from 'react';
import Post from './Post'
import { connect } from 'react-redux';
import { retrievePosts, selectPost, deletePost, setCurrentPost } from '../../actions/feedback_forum_actions/Post_Actions';

class PostList extends React.Component {



    renderFeedbackClass(post){
        let cls = (this.props.selectedPosts.hasOwnProperty(post._id)) ? "feedback-selected" : "feedback";
        return cls
    }

    handleSelectPost = (post, e) => {
        e.preventDefault();
        console.log(e);
        if (e.type === "contextmenu") this.props.selectPost(post);
    }

    handleDeletePost = (post) => {
        console.log(post.tags);
        this.props.deletePost(post);
    }

    handleSetCurrentPost = (post) => {
        this.props.setCurrentPost(post);
    }

    addPostTag = (post) => {
        this.props.setCurrentPost(post);
        this.props.openCreateTagModal();
    }

    showPostModal = (post) => {
        this.props.setCurrentPost(post);
        this.props.openShowPostModal();
    }

    renderList() {
        return this.props.posts.map(post => {
            return <Post showPost = {() => {this.showPostModal(post)}} addPostTag = {() => {this.addPostTag(post)}} onSetCurrent = {() => this.handleSetCurrentPost(post)} onDelete = {() => {this.handleDeletePost(post)}} onSelect = {(e) => {this.handleSelectPost(post, e)}} key = {post._id} votes = {post.numVotes}
            cls = {this.renderFeedbackClass(post)} name = "Baiju" id = {post._id} title = {post.title} body = {post.body} />
        })
    }

    render() {
        return (
            <div className = "dashcontent__feedbacklist">
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.postState.posts),
        selectedPosts: state.postState.selectedPosts
    }
}

export default connect(mapStateToProps, { retrievePosts, selectPost, deletePost, setCurrentPost })(PostList);