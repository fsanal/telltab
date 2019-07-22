import React from 'react';
import styled, {keyframes} from "styled-components";
import DropDown from '../../general/DropDown';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

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

    render(){
        return (
            <>
                <StyledLink to = {this.renderPathName()} >
                    <Req border = {this.props.border}>
                            <ReqContent onContextMenu = {this.props.onSelect}>
                                {this.props.title}
                                {this.renderTags()}
                            </ReqContent>
                        <DropDown renderBody = {this.renderActions()} />
                    </Req>
                </StyledLink>
            </>
        )
    }
}
/**/

export default withRouter(Requirement);

const Req = styled.div`
    font-family: 'Lato', sans-serif;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    margin-bottom: 0.7rem; 
    cursor:pointer;
    border: ${props => props.border};
    border-radius: 0.3rem;
    background-color: white;
    display: flex;
    color: black;
    min-height: 10rem;
    width: 26rem;
    font-size: 2rem;
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
    
`

const ReqContent = styled.div` 
    margin-left: 2rem;
    width: 100%;
    margin-top: 0.8rem;
    margin-bottom: 0.6rem;
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
