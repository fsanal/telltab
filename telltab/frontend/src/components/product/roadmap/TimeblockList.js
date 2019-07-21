import React from 'react';
import Timeblock from './Timeblock'
import { connect } from 'react-redux';
import { retrieveRequirements } from '../../../actions/roadmap_actions/Requirement_Actions'
import { createTimeblock, selectTimeblock, editTimeblock, deleteTimeblock } from '../../../actions/roadmap_actions/Timeblock_Actions';
import CreateTimeblock from './CreateTimeblock';
import EditTimeblock from './EditTimeblock';
import styled from "styled-components";
import { Field } from 'redux-form';
import Modal from '../../general/Modal';

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


    renderList() {
        return this.props.timeblocks.map(timeblock => {
            return (
                <>
                    <Timeblock timeblock={timeblock} onDelete={() => { this.props.selectTimeblock(timeblock); this.handleDeleteTimeblock(timeblock) }}
                        onSelect={(e) => { this.handleSelectTimeblock(timeblock, e) }}
                        onEdit={() => { this.props.selectTimeblock(timeblock); /*Edit shit*/ }}
                        key={timeblock._id} id={timeblock._id} title={timeblock.title} beginDate={timeblock.beginDate}
                        endDate={timeblock.endDate} />
                </>
            );
        })
    }

    render() {
        return (
            <>
                <List>
                    {this.renderList()}
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
    return {
        timeblocks: Object.values(state.timeblockState.timeblocks),
        currentTimeblock: state.timeblockState.currentTimeblock,
    }
}


export default connect(mapStateToProps, {
    createTimeblock, selectTimeblock, editTimeblock,
    deleteTimeblock, retrieveRequirements
})(TimeblockList);

const List = styled.div`
    display: flex;
    width: 184rem;
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
