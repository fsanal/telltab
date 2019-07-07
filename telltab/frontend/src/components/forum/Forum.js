import React from 'react';
import ForumNav from './ForumNav'
import PostList from './PostList';
import Toolbar from './Toolbar';
import CategoryBox from './catbox/CategoryBox';


const Forum = () => {
    return (
        <div>
            <div className = "dashcontent">
                <ForumNav/>
                <Toolbar/>
                <div className = "dashcontent__boxes">
                    <div className = "dashcontent__create">
                        <i className="dashcontent__createpost fas fa-plus-circle"></i>
                        <div className = "dashcontent__createpost-content">Create Post</div>
                    </div>
                    <CategoryBox/>
                </div>
                <PostList/>
            </div>
        </div>
    )
  
}

export default Forum;