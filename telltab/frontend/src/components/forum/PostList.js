import React from 'react';
import Post from './Post'
import { connect } from 'react-redux';
import { fetchFeedbacks } from '../../actions/feedback_forum_actions/index';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';

class PostList extends React.Component {


    renderList() {
        return this.props.posts.map(post => {
            return <Post key = {post._id} votes = {post.numVotes}
            name = "Baiju" id = {post._id} title = {post.title} body = {post.body} />
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
    console.log(state.postState.posts);
    return {
        posts: Object.values(state.postState.posts)
    }
}

export default connect(mapStateToProps, { retrievePosts })(PostList);