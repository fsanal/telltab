import React from 'react';

const Post = (props) => {
    return (
        <div className = {props.cls}>
            <div  onContextMenu = {props.onSelect} className = "feedback__content">
                <div className = "feedback__content-title">
                    {props.title}
                </div>
                <div className = "feedback__content-description">
                    {props.body}
                </div>
            </div>
            <div className = "feedback__delete">
                <div onClick = {props.onDelete} className = "ellipse__box" >
                    <i className ="fas fa-ellipsis-v"></i>
                </div>
                <div className = "arrowright__box">
                    <i className ="fas fa-angle-double-right"></i>
                </div>
            </div>
        </div>
    )
}


/*
<div className = "feedback__votes">
                    <i class="far fa-caret-square-up fa-2x"></i>
                    <div>{this.props.votes}</div>
                </div>

<div className = "feedback__person">
                    <div className = "feedback__person-picture">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className = "feedback__person-name">{this.props.name}</div>
                </div>
*/

export default Post;