import React from 'react';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { getProductRoadmap } from '../../actions/roadmap_actions/RoadMap_Actions';
import { retrieveInitiatives } from '../../actions/roadmap_actions/Initiative_Actions';
import history from '../../history';


class Roadmap extends React.Component {
    componentDidMount() {
        const promise = this.props.getProductForum();
        promise.then(this.props.retrieveInitiatives());
    }

    openModal(){
        let path = window.location.pathname + "/create";
        history.push(path);
    }

    render() {
        return (
            <div>test</div>
        );
    }
}

export default connect(null, { getProductRoadmap, retrieveInitiatives })(Roadmap);

