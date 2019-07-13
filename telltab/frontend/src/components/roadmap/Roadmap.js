import React from 'react';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { getProductRoadmap } from '../../actions/roadmap_actions/RoadMap_Actions';
import { retrieveRequirements } from '../../actions/roadmap_actions/Requirement_Actions';
//import { retrieveInitiatives } from '../../actions/roadmap_actions/Initiative_Actions';
//import { retrieveTimeBlocks } from '../../actions/roadmap_actions/TimeBlock_Actions';
import RoadMapNav from './RoadMapNav';
import history from '../../history';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import RequirementList from './RequirementList';


class Roadmap extends React.Component {
	componentDidMount() {
		const promise = this.props.getProductRoadmap();
		promise.then((result) => {
			this.props.retrieveRequirements();
			//this.props.retrieveInitatives();
		});
	}

	openModal() {
		let path = window.location.pathname + "/createRequirement";
		history.push(path);
	}

	render() {
		return (
			<div className="prodash__rightcontent">
				<div>
					<div className="dashcontent">
						<RoadMapNav />
						<div>Roadmap</div>
					</div>
				</div>
				<ButtonToolbar>
					<Button variant="primary" size="lg" onClick={() => this.openModal()}>
						Create Requirement
    				</Button>
				</ButtonToolbar>
				<RequirementList />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentRequirement: state.requirementState.currentRequirement
	}
}

export default connect(mapStateToProps, { getProductRoadmap, retrieveRequirements })(Roadmap);

