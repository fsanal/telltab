import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/feedback_forum_actions/Post_Actions'
class Toolbar extends React.Component {


     handleMultiDelete = () => {
          let toBeDeletedPosts = this.props.selectedPosts;
          toBeDeletedPosts.map((post) => {
               this.props.deletePost(post);
          })
     }    
    
    render(){
         return (
               <div className = "dashcontent__toolbar">
                    <div className = "dashcontent__toolbar-box">
                         <i onClick = {this.handleMultiDelete} class="toolbar-item fas fa-trash"></i>
                         <i class="toolbar-item fas fa-angle-right"></i>
                         <i class="toolbar-item fas fa-eye"></i>
                         <i class="toolbar-item fas fa-address-book"></i>
                         <i class="toolbar-item fas fa-suitcase"></i>
                         <i class="toolbar-item fas fa-tag"></i>
                         <i class="toolbar-item fas fa-comment-dots"></i>
                         <i class="toolbar-item fas fa-bell"></i>
                         <i class="toolbar-item fas fa-star"></i>
                    </div>
               </div>
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