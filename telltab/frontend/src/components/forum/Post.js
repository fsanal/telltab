import React from 'react';

class Post extends React.Component {
    
    renderFeedbackClass(){
        return "feedback"
    }

    render(){
        return (
            <div onClick = {this.props.onSelect} className = {this.props.cls}>
                <div className = "feedback__votes">
                    <i class="far fa-caret-square-up fa-2x"></i>
                    <div>{this.props.votes}</div>
                </div>
                
                <div className = "feedback__content">
                    <div className = "feedback__content-title">
                        {this.props.title}
                    </div>
                    <div className = "feedback__content-description">
                        {this.props.body}
                    </div>
                </div>
                <div className = "feedback__person">
                    <div className = "feedback__person-picture">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className = "feedback__person-name">{this.props.name}</div>
                </div>
            </div>
        )
    }
}

export default Post;