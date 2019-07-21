import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import CreateRequirement from './CreateRequirement';
import {retrieveRequirements, createRequirement} from '../../../actions/roadmap_actions/Requirement_Actions';
import { connect } from 'react-redux';

class Timeblock extends React.Component {
    constructor(){
        super();
        this.state = {
            requirements: null
        }
    }

    componentDidMount(){
        this.props.retrieveRequirements(this.props.timeblock._id).then((result) => {
            console.log(result);
            this.setState({requirements: result})
        })
    }

    renderRequirements(){
        if (this.state.requirements) return(this.state.requirements.map(requirement => {
            return <div key = {requirement._id}>{requirement.title}</div>
        }))
    }

    onCreateReq(formValues) {
        this.props.createRequirement(this.props.timeblock._id, formValues).then((result) => {
            let newReqs = this.state.requirements;
            console.log(newReqs);
            newReqs.push(result);
            this.setState({requirements: newReqs})
        })
    }

    render(){
        return (
            <div>
                <TimeblockWrapper>
                    {this.props.title}
                    {this.renderRequirements()}
                    <CreateRequirement onCreateReq = {(formValues) => this.onCreateReq(formValues)} timeblock = {this.props.timeblock} />
                </TimeblockWrapper>
            </div>
        )
    }
}

export default connect(null, { retrieveRequirements, createRequirement })(Timeblock);



const TimeblockWrapper = styled.div`
	background-color: #94EA78;
    border-radius: 2rem;
    border: "#94EA78 solid 1rem";
	display: flex;
	flex-direction: column;
	width: 20rem;
	
	margin-top: ${props => props.marginTop};
	margin-left: ${props => props.marginLeft};
	margin-bottom: ${props => props.marginBottom};
	margin-right: ${props => props.marginRight};
`