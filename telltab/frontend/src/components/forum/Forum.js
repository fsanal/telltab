import React from 'react';
import ForumNav from './ForumNav'
import PostList from './PostList';
import Toolbar from './Toolbar';
import BucketBox from './bucketbox/BucketBox';
import ForumUtility from './ForumUtility';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';
import { retrieveBuckets } from '../../actions/feedback_forum_actions/Bucket_Actions';
import history from '../../history';

class Forum extends React.Component {
    constructor() {
        super();
        this.state = {
            showCreatePostModal: false,
        };
    }

    componentDidMount(){
        const promise = this.props.getProductForum();
        promise.then((result) => {
            this.props.retrievePosts();
            this.props.retrieveBuckets();
        });
    }

    componentDidUpdate(){
        this.props.retrievePosts();
    }

    openCreatePostModal = () => {
        this.setState({showCreatePostModal: true})
    }

    closeCreatePostModal = () => {
        this.setState({showCreatePostModal: false})
    }

    render(){
        return (
            <div className = "prodash__rightcontent">
                <div>
                    <div className = "dashcontent">
                        <ForumNav/>
                        <ForumUtility/>
                        <Toolbar/>
                        <div className = "dashcontent__boxes">
                            <div className = "dashcontent__create" onClick = {this.openCreatePostModal}>
                                <i className="dashcontent__createpost fas fa-plus-circle"></i>
                                <div className = "dashcontent__createpost-content">Create Post</div>
                            </div>
                            <BucketBox/>
                        </div>
                        <PostList/>
                    </div>
                </div>
                <CreatePost show = {this.state.showCreatePostModal} onHide = {this.closeCreatePostModal} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentBucket: state.bucketState.currentBucket
    }
}


export default connect(mapStateToProps, { getProductForum, retrievePosts, retrieveBuckets })(Forum);