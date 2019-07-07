import React from 'react';
import Post from './Post'
import { connect } from 'react-redux';
import { fetchFeedbacks } from '../../actions/index';

class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchFeedbacks();
    }


    renderList() {
        console.log(this.props.feedbacks);
        return this.props.feedbacks.map(feedback => {
            return <Post key = {feedback.feedbackId} votes = {feedback.votes}
            name = {feedback.name} id = {feedback.feedbackId} title = {feedback.title} content = {feedback.content} />
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
        feedbacks: Object.values(state.feedbacks)
    }
}

export default connect(mapStateToProps, { fetchFeedbacks })(PostList);