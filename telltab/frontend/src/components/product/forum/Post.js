import React from 'react';
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';
import styled, {keyframes} from "styled-components";



const Feedback = styled.div`
    font-family: 'Rubik', sans-serif;
    margin-left: 2rem
    margin-bottom: 1rem; 
    cursor:pointer;
    border: ${props => props.border};
    border-radius: 0.5rem;
    background-color: white;
    display: flex;
    color: black;
    height: 10rem;
    width: 75rem;
    margin-left: 2rem;
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
`


const VoteBox = styled.div` 
    width: 3rem;
    font-size: 2rem;
    margin-left: 1.5rem;
    margin-top: 2.3rem;
    text-align: center;
    font-weight: 600;
    color: #DADCE0;
`

const FeedbackContent = styled.div` 
    margin-left: 1rem;
    width: 100%;
    margin-top: 1rem;
`

const FeedbackTitle = styled.div` 
    font-size: 2.3rem;
    color: #172B4D;
    font-weight: bold;
    height: 2rem;
`

const FeedbackDescription = styled.div`
    padding-top: 1.2rem;
    font-size: 2rem;
    font-weight: 400;
`



const Post = (props) => {
    return (
        <div>
            <Feedback border = {props.border}>
                <VoteBox className = {props.voteCls} >
                        <i onClick = {props.onVote} class="far fa-caret-square-up fa-2x"></i>
                        <div>{props.numVotes}</div>
                </VoteBox>
                <FeedbackContent onClick = {props.showPost}  onContextMenu = {props.onSelect} className = "feedback__content">
                    <FeedbackTitle>
                        {props.title}
                    </FeedbackTitle>
                    <FeedbackDescription className = "feedback__content-description">
                        {props.body}
                    </FeedbackDescription>
                </FeedbackContent>

            </Feedback>
        </div>
    )
}

/*
<div >
                    <DropdownButton title = {props.progress} id = "post__dropdown2" >
                            <Dropdown.Item onClick = {() => {props.changeProgress(props.post, "Under Review")}}>Under Review</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {props.changeProgress(props.post, "In Progress")}}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {props.changeProgress(props.post, "Complete")}}>Complete</Dropdown.Item>
                    </DropdownButton>
                </div>



<div className = "feedback__delete">
                    <DropdownButton title = "" id = "post__dropdown" >
                            <Dropdown.Item  onClick = {props.onDelete} >Delete</Dropdown.Item>
                            <Dropdown.Item onClick = {props.addPostTag} >Add Tag</Dropdown.Item>
                            <Dropdown.Item >Change Visibility</Dropdown.Item>
                    </DropdownButton>
                </div>
*/

/*
className = {`feedback__votes ${props.voteCls}`}
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