import React from 'react';
import PostList from './PostList';
import Toolbar from './Toolbar';
import BucketBox from './bucketbox/BucketBox';
import CreatePost from './CreatePost';
import AddTag from './AddTag';
import PostInfo from './PostInfo';
import { connect } from 'react-redux';
import { getProductForum } from '../../../actions/feedback_forum_actions/Forum_Actions';
import { retrievePosts } from '../../../actions/feedback_forum_actions/Post_Actions';
import { retrieveBuckets } from '../../../actions/feedback_forum_actions/Bucket_Actions';
import { retrieveComments } from '../../../actions/global_actions/Comment_Actions';
import { retrieveVotes } from '../../../actions/feedback_forum_actions/Vote_Actions';
import history from '../../../history';
import styled, {keyframes} from "styled-components";
import Modal from '../../general/Modal';

const ForumContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

const LeftBox = styled.div`
    height: 100%;
    width: 60rem;
    
`

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`

const Utility = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    height: 60rem;
    width: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    border: #DADCE0 solid 0.2rem;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.2);

`

const UtilitySection = styled.div`
    height: ${props => props.height}
`

const CreateContainer =  styled.div`
    display: flex;
    background-color: white
    border: 4px solid #3c40c6;
    cursor:pointer;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    height: 6rem;
    width: 17rem;
    align-items:center;
    border-radius: 3rem;
`

const CreateContent = styled.div`
    color: #3c40c6;
    display: "inline-block";
    font-size: 2rem;
    margin-left: 0.2rem;
    font-weight: 600;
`


class Forum extends React.Component {
    constructor() {
        super();
        this.state = {
            showCreatePostModal: false,
            showCreateTagModal: false,
            showPostModal: false
        };
    }

    componentDidMount() {
        const promise = this.props.getProductForum();
        promise.then((result) => {
            this.props.retrievePosts();
            this.props.retrieveBuckets();
            this.props.retrieveVotes();
        });
    }


    openCreatePostModal = () => {
        this.setState({ showCreatePostModal: true })
    }

    closeCreatePostModal = () => {
        this.setState({ showCreatePostModal: false })
    }

    openCreateTagModal = () => {
        this.setState({showCreateTagModal: true})
    }

    closeCreateTagModal = () => {
        this.setState({showCreateTagModal: false})
    }

    openShowPostModal = () => {
        this.setState({showPostModal: true})
        this.props.retrieveComments();
    }

    closeShowPostModal = () => {
        this.setState({showPostModal: false})
    }

    renderCreatePost() {
        return (
            <>
                <CreatePost onDismiss = {() => this.closeCreatePostModal()}/>
            </>
        )
    }

    renderPostInfo() {
        return (
            <>
                <PostInfo onDismiss = {() => this.closeShowPostModal()}/>
            </>
        )
    }
    /*
    <div className="dashcontent__boxes">
                            <div className="dashcontent__create" onClick={this.openCreatePostModal}>
                                <i className="dashcontent__createpost fas fa-plus-circle"></i>
                                <div className="dashcontent__createpost-content">Create Post</div>
                            </div>
                            <BucketBox />
                        </div>


                        <CreatePost show = {this.state.showCreatePostModal} onHide = {this.closeCreatePostModal} />
                <AddTag show = {this.state.showCreateTagModal} onHide = {this.closeCreateTagModal} />
                <ShowPostInfo show = {this.state.showPostModal} onHide = {this.closeShowPostModal} />

                <div>
                    <div className="dashcontent">
                        <Toolbar />
                       
                    </div>
                </div>
    */

    render(){
        return (
            <>
                <ForumContainer>
                    <LeftBox>
                            <Utility>
                                <UtilitySection height = "10rem">
                                    <CreateContainer onClick={this.openCreatePostModal}>
                                        <i className="material-icons forum__createicon">add</i>
                                        <CreateContent >Create Post</CreateContent>
                                    </CreateContainer>
                                </UtilitySection>
                            </Utility>
                    </LeftBox>
                    <RightBox>
                            <Toolbar/>
                            <PostList openCreateTagModal = {this.openCreateTagModal}  openShowPostModal = {this.openShowPostModal} />
                    </RightBox>
                </ForumContainer>
                
                <Modal height = "40rem" width = "65rem" renderContent = {this.renderCreatePost()} show = {this.state.showCreatePostModal} onDismiss = {() => this.closeCreatePostModal()}/>
                <Modal height = "60rem" width = "100rem" renderContent = {this.renderPostInfo()} show = {this.state.showPostModal} onDismiss = {() => this.closeShowPostModal()}/>
           </>
        )
    }
}



export default connect(null, { getProductForum, retrievePosts, retrieveBuckets, retrieveVotes, retrieveComments })(Forum);
