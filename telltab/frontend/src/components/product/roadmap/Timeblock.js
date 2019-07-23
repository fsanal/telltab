import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import CreateRequirement from './CreateRequirement';
import { retrieveRequirements, createRequirement } from '../../../actions/roadmap_actions/Requirement_Actions';
import { changeTimeblockRequirements } from '../../../actions/roadmap_actions/Timeblock_Actions';
import { connect } from 'react-redux';
import DropDown from '../../general/DropDown';
import Requirement from './Requirement';
import { Droppable } from 'react-beautiful-dnd';

class Timeblock extends React.Component {
    
    constructor(){
        super();
    }

    /*
    componentDidMount(){
        this.props.retrieveRequirements(this.props.timeblock._id).then((result) => {
            this.setState({requirements: result})
        })
    }
    */

/*
    renderRequirements(provided) {
        if (this.props.timeblock.requirements) return(
            <div  
                ref= {provided.innerRef} 
                {...provided.droppableProps}
            >
                   <RequirementContainer >
                        {this.props.timeblock.requirements.map((reqID, index) => {
                            let requirement = this.props.requirements2[reqID];
                            if (requirement) return <Requirement index = {index} id = {requirement._id} key = {requirement._id} title = {requirement.title} tags = {requirement.tags} />})
                        }
                        {provided.placeholder}
                    </RequirementContainer>
            </div>
        )*/
       /* return (this.props.requirements.map(requirement => {
        return <Requirement id = {requirement._id} key = {requirement._id} title = {requirement.title} tags = {requirement.tags} /> } ))*/
  /*  }*/

    onCreateReq(formValues) {
        this.props.createRequirement(this.props.timeblock._id, formValues).then((result) => {
            let newRequirements = this.props.timeblock.requirements;
            newRequirements.push(result._id);
            this.props.changeTimeblockRequirements(this.props.timeblock._id, {requirementIDs: newRequirements});
        })
        /*
        .then((result) => {
            let newReqs = this.state.requirements;
            newReqs.push(result);
            this.setState({requirements: newReqs})
        })
        */
    }

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
            <>
                <TimeblockWrapper>
                    {this.props.title}
                    {this.renderActions()}
                    <Droppable droppableId = {this.props.timeblock._id}>
                        {provided => this.props.renderRequirements(provided)}
                    </Droppable>
                    <CreateRequirement onCreateReq = {(formValues) => this.onCreateReq(formValues)} timeblock = {this.props.timeblock} />
                </TimeblockWrapper>
            </>
        )
    }
}

const mapStateToProps = (state) => {
   
 /*   let requirements = Object.values(state.requirementState.requirements).filter(req => 
       { if (req.timeblock) return req.timeblock._id === ownProps.timeblock._id});
       requirements,*/
    return {
        requirements: state.requirementState.requirements
    }
}


export default connect(mapStateToProps, { retrieveRequirements, createRequirement, changeTimeblockRequirements })(Timeblock);

const TimeblockWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

