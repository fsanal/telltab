import React from 'react';
import Timeblock from './Timeblock'
import EditTimeblock from './EditTimeblock';
import { connect } from 'react-redux';
import { createTimeblock, selectTimeblock, editTimeblock, deleteTimeblock, retrieveTimeBlocks } from '../../../actions/roadmap_actions/TimeBlock_Actions';
import Modal from '../../general/Modal';
import styled from "styled-components";
import { Field } from 'redux-form';

class TimeblockList extends React.Component {

    constructor() {
        super();
        this.state = {
            showEditTimeblockModal: false,
        };
    }

    handleSelectTimeblock = (timeblock, e) => {
        e.preventDefault();
        if (e.type === "contextmenu") this.props.selectTimeblock(timeblock);
    }

    handleDeleteTimeblock = (timeblock) => {
        this.props.deleteTimeblock(timeblock._id);
    }

    openEditTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: true })
    }

    closeEditTimeblockModal = () => {
        this.setState({ showCreateTimeblockModal: false })
    }

    renderEditTimeblock() {
        return (
            <>
                <EditTimeblock onDismiss={() => this.closeEditTimeblockModal()} />
            </>
        )
    }

    renderList() {
        return this.props.timeblocks.map(timeblock => {
            return <Timeblock timeblock={timeblock} onDelete={() => { this.props.selectTimeblock(timeblock); this.handleDeleteTimeblock(timeblock) }}
                onSelect={(e) => { this.handleSelectTimeblock(timeblock, e) }}
                onEdit={() => { this.props.selectTimeblock(timeblock); this.openEditTimeblockModal(); this.renderEditTimeblock() }}
                key={timeblock._id} id={timeblock._id} title={timeblock.title} beginDate={timeblock.beginDate}
                endDate={timeblock.endDate} />
        })
    }

    render() {
        return (
            <>
                <List>
                    {this.renderList()}
                </List>
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
    deleteTimeblock, retrieveTimeBlocks
})(TimeblockList);

const List = styled.div`
    display: flex;
    width: 100%
    background-color: #F4F5F7;
    border-radius: 0.5rem;
    > div:nth-of-type(1) {
        margin-top: 2rem;
    }

    > div:last-of-type {
        margin-bottom: 2rem;
    }
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
