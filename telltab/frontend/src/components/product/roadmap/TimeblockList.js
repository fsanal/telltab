import React from 'react';
import Timeblock from './Timeblock'
import {DragDropContext} from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { retrieveRequirements } from '../../../actions/roadmap_actions/Requirement_Actions'
import { createTimeblock, selectTimeblock, editTimeblock, deleteTimeblock, changeTimeblockRequirements } from '../../../actions/roadmap_actions/Timeblock_Actions';
import CreateTimeblock from './CreateTimeblock';
import EditTimeblock from './EditTimeblock';
import styled from "styled-components";
import { Field } from 'redux-form';
import Modal from '../../general/Modal';
import Requirement from './Requirement';

class TimeblockList extends React.Component {

    constructor() {
        super();
        this.state = {
            showCreateTimeblockModal: false,
            showEditTimeblockModal: false
        };
    }

    openCreateTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: true })
    }

    closeCreateTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: false })
    }

    openEditTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: true })
    }

    closeEditTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: false })
    }

    renderCreateTimeblock() {
        return (
            <>
                <CreateTimeblock onDismiss={() => this.closeCreateTimeblockModal()} />
            </>
        )
    }

    renderEditTimeblock() {
        return (
            <>
                <EditTimeblock onDismiss={() => this.closeEditTimeblockModal()} />
            </>
        )
    }

    handleSelectTimeblock = (timeblock, e) => {
        e.preventDefault();
        if (e.type === "contextmenu") this.props.selectTimeblock(timeblock);
    }

    handleDeleteTimeblock = (timeblock) => {
        this.props.deleteTimeblock(timeblock._id);
    }

    renderRequirements(timeblock, provided) {
        if (timeblock.requirements) return(
            <div  
                ref = {provided.innerRef} 
                {...provided.droppableProps}
            >
                   <RequirementContainer >
                        {timeblock.requirements.map((reqID, index) => {
                            let requirement = this.props.requirements[reqID];
                            if (requirement) return <Requirement index = {index} id = {requirement._id} key = {requirement._id} title = {requirement.title} tags = {requirement.tags} />})
                        }
                        {provided.placeholder}
                    </RequirementContainer>
            </div>
        )
       /* return (this.props.requirements.map(requirement => {
        return <Requirement id = {requirement._id} key = {requirement._id} title = {requirement.title} tags = {requirement.tags} /> } ))*/
    }

    renderList() {
        return this.props.timeblocks2.map(timeblock => {
            return (
                <>
                    <Timeblock renderRequirements = {(provided) => this.renderRequirements(timeblock, provided)} timeblock={timeblock} onDelete={() => { this.props.selectTimeblock(timeblock); this.handleDeleteTimeblock(timeblock) }}
                        onSelect={(e) => { this.handleSelectTimeblock(timeblock, e) }}
                        onEdit={() => { this.props.selectTimeblock(timeblock); /*Edit shit*/ }}
                        key={timeblock._id} id={timeblock._id} title={timeblock.title} beginDate={timeblock.beginDate}
                        endDate={timeblock.endDate} />
                </>
            );
        })
    }
//
    onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) {
          return;
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
        const timeblock = this.props.timeblocks[source.droppableId];
        const newReqs = Array.from(timeblock.requirements);
        newReqs.splice(source.index, 1);
        newReqs.splice(destination.index, 0, draggableId);
        this.props.changeTimeblockRequirements(timeblock._id, {requirementIDs: newReqs});
     //   
    };

    render() {
        return (
            <>
                <List>
                    <DragDropContext onDragEnd = {this.onDragEnd}>
                        {this.renderList()}
                    </DragDropContext>
                    <CreateContainer onClick={this.openCreateTimeblockModal}>
                        <CreateContent >Create Timeblock</CreateContent>
                    </CreateContainer>
                </List>
                <Modal height="50rem" width="65rem" renderContent={this.renderCreateTimeblock()}
                    show={this.state.showCreateTimeblockModal} onDismiss={() => this.closeCreateTimeblockModal()} />
                <Modal height="50rem" width="65rem" renderContent={this.renderEditTimeblock()}
                    show={this.state.showEditTimeblockModal} onDismiss={() => this.closeEditTimeblockModal()} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.timeblockState.timeblocks)
    return {
        timeblocks: state.timeblockState.timeblocks,
        timeblocks2: Object.values(state.timeblockState.timeblocks),
        requirements: state.requirementState.requirements
    }
}


export default connect(mapStateToProps, {
    createTimeblock, selectTimeblock, editTimeblock,
    deleteTimeblock, retrieveRequirements, changeTimeblockRequirements
})(TimeblockList);

const List = styled.div`
    display: flex;
    background-color: #F4F5F7;
    border-radius: 0.5rem;
`

const EditForm = styled.div`
    display: flex;
    flex-direction: vertical;
    width: 100%
    border-radius: 0.5rem;
`

const Button = styled.button`
    background-color:#3c40c6;
    color: white;
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: 2rem;
    border: 2px solid background-color;
    border-radius: 0.5rem;
    cursor: pointer;
    padding: 0.25em 1em;

    :hover {
        background-color:#575fcf;
    }
    :focus {
        outline: 0;
        box-shadow: none!important;
    }
`

const CreateContainer = styled.div`
    display: flex;
    background-color: white
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    cursor:pointer;
    margin-top: 3rem;
    margin-left: 2rem;
    margin-right: auto;
    height: 6rem;
    width: 17rem;
    align-items:center;
    border-radius: 3rem;
    border: 1.5px solid #3c40c6;
`

const CreateContent = styled.div`
    color: #3c40c6;
    display: "inline-block";
    font-size: 2rem;
    margin-left: 0.2rem;
    font-weight: 600;
`


const RequirementContainer = styled.div`
    margin-top: 3rem;
`