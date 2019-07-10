import React from 'react';
import ForumNav from './ForumNav'
import PostList from './PostList';
import Toolbar from './Toolbar';
import BucketBox from './bucketbox/BucketBox';
import ForumUtility from './ForumUtility';
import { connect } from 'react-redux';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';
import { retrieveBuckets } from '../../actions/feedback_forum_actions/Bucket_Actions';
import history from '../../history';

class Forum extends React.Component {

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

    openModal(){
        let path = window.location.pathname + "/createPost";
        history.push(path);
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
                            <div className = "dashcontent__create" onClick = {() => this.openModal()}>
                                <i className="dashcontent__createpost fas fa-plus-circle"></i>
                                <div className = "dashcontent__createpost-content">Create Post</div>
                            </div>
                            <BucketBox/>
                        </div>
                        <PostList/>
                    </div>
                </div>
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