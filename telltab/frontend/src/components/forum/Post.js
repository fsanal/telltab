import React from 'react';
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';

const Post = (props) => {
    return (
        <div>
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
                    <DropdownButton title = "" id = "post__dropdown" >
                            <Dropdown.Item  onClick = {props.onDelete} >Delete</Dropdown.Item>
                            <Dropdown.Item onClick = {props.addPostTag} >Add Tag</Dropdown.Item>
                            <Dropdown.Item >Change Visibility</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
    )
}



/*
<div className = "feedback__votes">
                    <i class="far fa-caret-square-up fa-2x"></i>
                    <div>{props.votes}</div>
                </div>

<div className = "feedback__person">
                    <div className = "feedback__person-picture">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className = "feedback__person-name">{props.name}</div>
                </div>
*/

export default Post;