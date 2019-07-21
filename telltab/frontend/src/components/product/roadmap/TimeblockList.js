import React from 'react';
import Timeblock from './Timeblock'
import { connect } from 'react-redux';
import { createTimeblock, selectTimeblock, editTimeblock, deleteTimeblock} from '../../../actions/roadmap_actions/TimeBlock_Actions';
import { retrieveRequirements } from '../../../actions/roadmap_actions/Requirement_Actions'
import styled from "styled-components";

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

class TimeblockList extends React.Component {

    handleSelectTimeblock = (timeblock, e) => {
        e.preventDefault();
        if (e.type === "contextmenu") this.props.selectPost(timeblock);
    }

    handleDeleteTimeblock = (timeblock) => {
        this.props.deleteTimeblock(timeblock._id);
    }


    renderList() {
        return this.props.timeblocks.map(timeblock => {
            return <Timeblock timeblock = {timeblock}  />
        })
    }

    render() {
        return (
            <List>
                {this.renderList()}
            </List>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeblocks: Object.values(state.timeblockState.timeblocks),
        currentTimeblock: state.timeblockState.currentTimeblock,
    }
}

export default connect(mapStateToProps, { createTimeblock, selectTimeblock, editTimeblock, 
    deleteTimeblock, retrieveRequirements })(TimeblockList);