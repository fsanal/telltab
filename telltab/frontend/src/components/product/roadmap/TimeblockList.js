import React from 'react';
import Timeblock from './Timeblock'
import { connect } from 'react-redux';
import { createTimeblock, selectTimeblock, editTimeblock, deleteTimeblock } from '../../../actions/roadmap_actions/Timeblock_Actions';
import styled from "styled-components";
import { Field } from 'redux-form';

class TimeblockList extends React.Component {

    handleSelectTimeblock = (timeblock, e) => {
        e.preventDefault();
        if (e.type === "contextmenu") this.props.selectTimeblock(timeblock);
    }

    handleDeleteTimeblock = (timeblock) => {
        this.props.deleteTimeblock(timeblock._id);
    }

    renderList() {
        return this.props.timeblocks.map(timeblock => {
            return <Timeblock timeblock={timeblock} onDelete={() => { this.props.selectTimeblock(timeblock); this.handleDeleteTimeblock(timeblock) }}
                onSelect={(e) => { this.handleSelectTimeblock(timeblock, e) }}
                onEdit={() => { this.props.selectTimeblock(timeblock); /*Edit shit*/}}
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
    deleteTimeblock
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
