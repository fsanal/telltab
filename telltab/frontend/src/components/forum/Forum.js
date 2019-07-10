import React from 'react';
import ForumNav from './ForumNav'
import PostList from './PostList';
import Toolbar from './Toolbar';
import CategoryBox from './catbox/CategoryBox';
import { connect } from 'react-redux';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';

class Forum extends React.Component {

    componentDidMount(){
        const promise = this.props.getProductForum();
        promise.then(this.props.retrievePosts());
    }

    render(){
        return (
            <div className = "prodash__rightcontent">
                <div>
                    <div className = "dashcontent">
                        <ForumNav/>
                        <Toolbar/>
                        <div className = "dashcontent__boxes">
                            <button className = "dashcontent__create">
                                <i className="dashcontent__createpost fas fa-plus-circle"></i>
                                <div className = "dashcontent__createpost-content">Create Post</div>
                            </button>
                            <CategoryBox/>
                        </div>
                        <PostList/>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, { getProductForum, retrievePosts })(Forum);