import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/feedback_forum_actions/Post_Actions'
import styled, {keyframes} from "styled-components";

const Bar = styled.div`
     display: flex;
     background-color: white;
     height: 5rem;
     border-radius: 0.5rem;
     margin-left: 1rem;
     margin-top: 1.5rem;
     box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.2);
     width: 58rem;
`


 




class Toolbar extends React.Component {


     handleMultiDelete = () => {
          let toBeDeletedPosts = this.props.selectedPosts;
          toBeDeletedPosts.map((post) => {
               this.props.deletePost(post);
          })
     }    
    
    render(){
         return (
                    <Bar>
                         <i onClick = {this.handleMultiDelete} class="toolbar-item fas fa-trash"></i>
                         <i class="toolbar-item fas fa-angle-right"></i>
                         <i class="toolbar-item fas fa-eye"></i>
                         <i class="toolbar-item fas fa-address-book"></i>
                         <i class="toolbar-item fas fa-suitcase"></i>
                         <i class="toolbar-item fas fa-tag"></i>
                         <i class="toolbar-item fas fa-comment-dots"></i>
                         <i class="toolbar-item fas fa-bell"></i>
                         <i class="toolbar-item fas fa-star"></i>
                    </Bar>

         /*
        <div className = "toolbar">
           <div className = "toolbar__item">
               Select All
           </div>
           <div className = "toolbar__item">
                Delete
           </div>
           <div className = "toolbar__item">
                Move
           </div>
           <div className = "toolbar__item">
                Set Visibility
           </div>
           <div className = "toolbar__item">
                Tag
           </div>
           <div className = "toolbar__item">
                Change Progress
           </div>
           <div className = "toolbar__item">
                Assign
           </div>
           <div className = "toolbar__item">
                Chat
           </div>
           <div className = "toolbar__item">
                Add to Actions
           </div>
           <div className = "toolbar__item">
                Notify
           </div>
           <div className = "toolbar__item">
                Star
           </div>
        </div>
        */
          )
     }
}

const mapStateToProps = (state) => {
     return {
         selectedPosts: Object.values(state.postState.selectedPosts),
     }
 }

 export default connect(mapStateToProps, { deletePost })(Toolbar);