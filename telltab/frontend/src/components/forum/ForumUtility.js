import React from 'react';
import { connect } from 'react-redux';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';

class ForumUtility extends React.Component {
    constructor() {
        super();
        this.timeout = 0;
    }


    
    handleChange = ({target}) => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.retrievePosts(target.value);
        }, 300);
    }
 
    render(){
        return(
            <div className = "forum__utility">
                <input onChange = {this.handleChange} className = "forum__searchbar" type = "text" />
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    console.log(state.bucketState.currentBucket);
    return {
        currentBucket: state.bucketState.currentBucket
    }
}

export default connect(null, { retrievePosts })(ForumUtility);