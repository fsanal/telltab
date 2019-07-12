import React from 'react';
import { connect } from 'react-redux';
import VModal from '../general/VModal';

class ShowPostInfo extends React.Component {

    renderTitle = () => {
        if (this.props.currentPost) return this.props.currentPost.title;
        return "";
    }

    renderTags = () => {
        if (this.props.currentPost) {
            return this.props.currentPost.tags.forEach(tag => {
                return <h5>{tag}</h5>
            })
        }
    }

    renderPost = () => {
        if (this.props.currentPost) {
            const {title, body, author, tags} = this.props.currentPost;
            console.log(tags);
            return(
                <div>
                    <h3>
                        {body}
                    </h3>
                    <h4>
                        {author}
                    </h4>
                    {this.renderTags()}
                </div>
            )
        }
        return (
            <div></div>
        )
    }


    render(){
        return(
           < VModal show = {this.props.show} onHide = {this.props.onHide} title = {this.renderTitle()} renderForm = {this.renderPost()} />
        )
    }   
}



const mapStateToProps = (state) => {
    return {
        currentPost: state.postState.currentPost
    }
}

export default connect(mapStateToProps)(ShowPostInfo)
