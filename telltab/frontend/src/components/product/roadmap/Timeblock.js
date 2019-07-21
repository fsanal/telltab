import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

class Timeblock extends React.Component {

    render(){
        return (
            <div>
                <TimeblockWrapper>
                    {this.props.title}
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
	width: 10rem;
	height: 30rem;
	margin-top: ${props => props.marginTop};
	margin-left: ${props => props.marginLeft};
	margin-bottom: ${props => props.marginBottom};
	margin-right: ${props => props.marginRight};
`