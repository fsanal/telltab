import React from 'react';
import PostList from './PostList';
import Toolbar from './Toolbar';
import BucketBox from './bucketbox/BucketBox'
import CreatePost from './CreatePost';
import AddTag from './AddTag';
import PostInfo from './PostInfo';
import { connect } from 'react-redux';
import { getProductForum } from '../../../actions/feedback_forum_actions/Forum_Actions';
import { retrievePosts } from '../../../actions/feedback_forum_actions/Post_Actions';
import { retrieveBuckets } from '../../../actions/feedback_forum_actions/Bucket_Actions';
import { retrieveComments } from '../../../actions/global_actions/Comment_Actions';
import { retrieveVotes } from '../../../actions/feedback_forum_actions/Vote_Actions';
import { getProduct } from '../../../actions/global_actions/Product_Actions';
import history from '../../../history';
import styled, {keyframes} from "styled-components";
import Modal from '../../general/Modal';

class Forum extends React.Component {
    constructor() {
        super();
        this.state = {
            showCreatePostModal: false,
            showCreateTagModal: false,
        };
    }

    componentDidMount() {
        this.props.getProduct(this.props.match.params.productID).then((result) => {
            if (this.props.product){
                this.props.getProductForum(this.props.product._id).then((result2) => {
                    this.props.retrievePosts();
                    this.props.retrieveBuckets();
                    this.props.retrieveVotes();
                });
            }
        })
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

    render(){
        if (!this.props.product){
            return (<div></div>)
        }
        return (
            <>
                <ForumContainer>
                    <LeftBox>
                        <UtilityBox>
                            <Toolbar/>
                            <Utility>
                                <UtilitySection height = "10rem">
                                    <CreateContainer onClick={this.openCreatePostModal}>
                                        <i className="material-icons forum__createicon">add</i>
                                        <CreateContent >Create Post</CreateContent>
                                    </CreateContainer>
                                    <BucketBox/>
                                </UtilitySection>
                            </Utility>
                        </UtilityBox>
                    </LeftBox>
                    <RightBox>
                            <PostList openCreateTagModal = {this.openCreateTagModal}  openShowPostModal = {this.openShowPostModal} />
                    </RightBox>
                </ForumContainer>
                <AddTag show = {this.state.showCreateTagModal} onDismiss = {() => this.closeCreateTagModal()}/>
                <CreatePost show = {this.state.showCreatePostModal} onDismiss = {() => this.closeCreatePostModal()}/>
            </>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        product: state.productState.products[ownProps.match.params.productID],
    }
}


export default connect(mapStateToProps, { getProductForum, retrievePosts, retrieveBuckets, retrieveVotes, retrieveComments, getProduct })(Forum);


const ForumContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 2rem;
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

const UtilityBox = styled.div`
    background-color: #F4F5F7; /*#F1F3F4;*/ /*#F1F0F0; #F4F5F7;*/
    
    width: 33rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    > div:nth-of-type(1) {
        margin-top: 2rem;
    }
    > div:last-of-type {
        margin-bottom: 3rem;
    }
`
const Utility = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    height: 40rem;
    width: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    border: "#BFBFBF solid 0.03rem";
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;

`

const UtilitySection = styled.div`
    height: ${props => props.height}
`

const CreateContainer =  styled.div`
    display: flex;
    background-color: white
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    cursor:pointer;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    height: 6rem;
    width: 17rem;
    align-items:center;
    border-radius: 3rem;
    border: 1.5px solid #3c40c6;
`

const CreateContent = styled.div`
    color: #3c40c6;
    display: "inline-block";
    font-size: 2rem;
    margin-left: 0.2rem;
    font-weight: 600;
`


