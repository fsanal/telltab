import React from 'react';
import { connect } from 'react-redux';
import { retrieveRequirements } from '../../actions/roadmap_actions/Requirement_Actions';

class RequirementList extends React.Component {

    componentDidMount() {
        this.props.retrieveRequirements();
    }

    renderRequirementList() {
        return this.props.requirements.map(requirement => {
            return (
                <div className="req_item" key={requirement.id}>
                    <div className="title">
                        {requirement.title}
                        <div className="body">
                            {requirement.body}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Requirements</h2>
                <div className="ui celled list">
                    {this.renderRequirementList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { requirements: Object.values(state.requirementState.requirements) };
}

export default connect(mapStateToProps, { retrieveRequirements })(RequirementList);
