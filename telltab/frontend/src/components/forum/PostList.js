import React from 'react';
import Post from './Post'
import { connect } from 'react-redux';
import { retrievePosts, selectPost, deletePost } from '../../actions/feedback_forum_actions/Post_Actions';

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
        this.props.deletePost(post);
    }

    renderList() {
        return this.props.posts.map(post => {
            return <Post onDelete = {() => {this.handleDeletePost(post)}} onSelect = {(e) => {this.handleSelectPost(post, e)}} key = {post._id} votes = {post.numVotes}
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

export default connect(mapStateToProps, { retrievePosts, selectPost, deletePost })(PostList);