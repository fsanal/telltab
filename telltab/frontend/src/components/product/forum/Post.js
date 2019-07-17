import React from 'react';
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';
import styled, {keyframes} from "styled-components";



const Feedback = styled.div`
    font-family: 'Lato', sans-serif;
    margin-left: 2rem
    margin-bottom: 0.7rem; 
    cursor:pointer;
    border: ${props => props.border};
    border-radius: 0.5rem;
    background-color: white;
    display: flex;
    color: black;
    min-height: 7rem;
    width: 75rem;
    margin-left: 2rem;
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
`


const VoteBox = styled.div` 
    width: 3rem;
    font-size: 2rem;
    margin-left: 1.5rem;
    margin-top: 1.2rem;
    text-align: center;
    font-weight: 600;
    color: #DADCE0;
`

const FeedbackContent = styled.div` 
    margin-left: 2rem;
    width: 100%;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    color: #172B4D;
`

const FeedbackTitle = styled.div` 
    font-size: 2.3rem;
    height: 2rem;
    font-weight: bold;
`

const FeedbackDescription = styled.div`
    padding-top: 0.7rem;
    font-size: 2.3rem;
    font-weight: 400;
    width: 50rem;
    word-wrap: break-word;
`



const Post = (props) => {
    return (
        <div>
            <Feedback border = {props.border}>
                <VoteBox className = {props.voteCls} >
                        <i onClick = {props.onVote} class="far fa-caret-square-up fa-2x"></i>
                        <div>{props.numVotes}</div>
                </VoteBox>
                <FeedbackContent onClick = {props.showPost}  onContextMenu = {props.onSelect}>
                    <FeedbackTitle>
                        {props.title}
                    </FeedbackTitle>
                    <FeedbackDescription>
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