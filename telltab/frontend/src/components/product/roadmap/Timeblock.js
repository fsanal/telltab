import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import DropDown from '../../general/DropDown';

class Timeblock extends React.Component {

    renderActions() {
        return(
            <>
                <DropDownItem onClick = {this.props.onEdit}> Edit </DropDownItem>
                <DropDownItem onClick = {this.props.onDelete}> Delete </DropDownItem>
            </>
        )
    }

    render(){
        return (
            <div>
                <TimeblockWrapper>
                    {this.props.title}
                    {this.renderActions()}
                </TimeblockWrapper>
            </div>
        )
    }
}

export default Timeblock;

const TimeblockWrapper = styled.div`
    display: flex;
    font-size: 4rem;
    color: white;
    background-color: #43a047;
    height: 75rem;
    border-radius: 0.5rem;
    margin-top: 3rem;
    margin-left: 3rem;
    margin-right: auto;
    margin-bottom: auto;
    border: "#BFBFBF solid 0.03rem";
    
    /*
    border: #DADCE0 solid 0.05rem;
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
    */
    width: 30rem;
`

const DropDownItem = styled.li`
    height: 2rem;
    z-index: 2
    left: 0;
    top: 100%;
    width: 100%;
    :hover {
        background-color: #DADCE0;
        color: black;
    }
    font-size: 0.3rem;
`