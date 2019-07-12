import React from 'react';
import { connect } from 'react-redux';
import { retrieveRequirements } from '../../actions/roadmap_actions/Requirement_Actions';

class RequirementList extends React.Component {

    componentDidMount() {
        this.props.retrieveRequirements();
    }

    render() {
        console.log(this.props.requirements);
        return <div>Requirement List</div>;
    }
}

const mapStateToProps = (state) => {
    return { requirements: Object.values(state.requirements) };
}

export default connect(mapStateToProps, { retrieveRequirements })(RequirementList);
