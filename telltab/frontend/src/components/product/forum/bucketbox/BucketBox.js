import React from 'react';
import Bucket from './Bucket'
import { connect } from 'react-redux';
import { selectBucket, createBucket, deleteBucket } from '../../../../actions/feedback_forum_actions/Bucket_Actions';
import { retrievePosts } from '../../../../actions/feedback_forum_actions/Post_Actions';
import history from '../../../../history';

class BucketBox extends React.Component {

    handleSelectBucket(bucket) {
        this.props.selectBucket(bucket);
        this.props.retrievePosts();
    }

    renderBuckets(){
        return this.props.buckets.map((bucket) => {
            return(
                <div key = {bucket._id} onClick = {() => {this.handleSelectBucket(bucket)}} className= "dashcontent__create_bucket">{bucket.name}</div>
            )
        })
    }

    openModal(){
        let path = "/createBucket";
        history.push(path);
    }

    render(){
        return (
            <div className = "dashcontent__boxes-buckets">
                <div onClick = {() => {this.openModal()}} className = "dashcontent__create_bucket" >Create Bucket</div>
                {this.renderBuckets()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        buckets: Object.values(state.bucketState.buckets),
    }
}

export default connect(mapStateToProps, { selectBucket, createBucket, 
    deleteBucket, retrievePosts })(BucketBox);