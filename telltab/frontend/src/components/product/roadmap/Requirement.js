import React from 'react';
import styled, {keyframes} from "styled-components";
import DropDown from '../../general/DropDown';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Draggable } from 'react-beautiful-dnd';

class Requirement extends React.Component {

    renderTags() {
        return (
            <TagContainer>
                {this.props.tags.map(tag => {
                    return (<Tag>{tag}</Tag>)
                })}
            </TagContainer>
        )
    }

    renderActions() {
        return(
            <>
                <DropDownItem onClick = {this.props.onDelete}>Delete</DropDownItem>
                <DropDownItem onClick = {this.props.addPostTag}>Add Tag</DropDownItem>
                <DropDownItem >Change Visibility</DropDownItem>
            </>
        )
    }

    renderPathName() {
        return `/products/${this.props.match.params.productID}/roadmap/r/${this.props.id}`
    }

    /*<StyledLink to = {this.renderPathName()} >*/

    renderBody(provided){
        return(
                
                    <Req  InnerRef= {provided.innerRef} 
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          border = {this.props.border}>
                            <ReqContent onContextMenu = {this.props.onSelect}>
                                {this.props.title}
                                {this.renderTags()}
                            </ReqContent>
                        <DropDown renderBody = {this.renderActions()} />
                    </Req>
        )
    }

    render(){
        return (
            <Draggable draggableId={this.props.id} 
            index={this.props.index}>
                {provided => (
                    <Req
                        ref = {provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        border = {this.props.border}
                    >
                        <ReqContent onContextMenu = {this.props.onSelect}>
                            {this.props.title}
                            {this.renderTags()}
                        </ReqContent>
                    </Req>
                )}
            </Draggable>
        )
    }
}
/**/

export default withRouter(Requirement);

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius; 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`

const Req = styled.div`
    font-family: 'Lato', sans-serif;
    margin-bottom: 0.7rem
    margin-left: 2rem;
    text-decoration: none;
    cursor:pointer;
    border: ${props => props.border};
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    min-height: 10rem;
    width: 26rem;
    font-size: 2rem;
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
    
`

const ReqContent = styled.div` 
    margin-left: 2rem;
    width: 100%;
    padding-top: 0.8rem;
    position: relative;
    color: black;

`



const DropDownItem = styled.li`
    height: 2rem;
    z-index: 2
    left: 0;
    top: 100%;
    :hover {
        background-color: #DADCE0;
        color: black;
    }
    font-size: 0.3rem;
`

const TagContainer = styled.div`
    display: flex;
    margin-top: 1rem;
`

const Tag = styled.div`
    border: #DADCE0 2px solid;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3rem;
    margin-right: 1rem;
    font-size: 2rem;
    text-align: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;
