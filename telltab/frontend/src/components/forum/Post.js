import React from 'react';

const Post = (props) => {
    return (
        <div className = "feedback">
            <div className = "feedback__checkbox">
                <i class="far fa-square"></i>
            </div>
            <div className = "feedback__votes">
                <i class="far fa-caret-square-up fa-2x"></i>
                <div>{props.votes}</div>
            </div>
            
            <div className = "feedback__content">
                <div className = "feedback__content-title">
                    {props.title}
                </div>
                <div className = "feedback__content-description">
                    {props.body}
                </div>
            </div>
            <div className = "feedback__person">
                <div className = "feedback__person-picture">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className = "feedback__person-name">{props.name}</div>
            </div>
        </div>
    )
}

export default Post;