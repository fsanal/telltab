import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import DropDown from '../../general/DropDown';

class Timeblock extends React.Component {

    renderActions() {
        return(
            <>
                <DropDownItem onClick = {this.props.onDelete}> Delete </DropDownItem>
                <DropDownItem onClick = {this.props.onEdit}> Edit </DropDownItem>
            </>
        )
    }

    render(){
        return (
            <div>
                <TimeblockWrapper>
                    <DropDown renderBody = {this.renderActions()} />
                </TimeblockWrapper>
            </div>
        )
    }
}

export default Timeblock;

const TimeblockWrapper = styled.div`
	background-color: #94EA78;
    border-radius: 2rem;
    border: "#94EA78 solid 1rem";
	display: flex;
	flex-direction: column;
	width: 35rem;
	height: 70rem;
	margin-top: ${props => props.marginTop};
	margin-left: ${props => props.marginLeft};
	margin-bottom: ${props => props.marginBottom};
	margin-right: ${props => props.marginRight};
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