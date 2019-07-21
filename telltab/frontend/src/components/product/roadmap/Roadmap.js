import React from 'react';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import styled from "styled-components";
import { getProduct } from '../../../actions/global_actions/Product_Actions';
import { getProductRoadmap } from '../../../actions/roadmap_actions/Roadmap_Actions';
import { retrieveTimeblocks } from '../../../actions/roadmap_actions/Timeblock_Actions';
import history from '../../../history';
import TimeblockList from './TimeblockList';

class Roadmap extends React.Component {

	componentDidMount() {
		this.props.getProduct(this.props.match.params.productID).then((result) => {
			//console.log(this.props.product);
			if (this.props.product) {
				this.props.getProductRoadmap(this.props.product._id).then((result2) => {
					this.props.retrieveTimeblocks();
				});
			}
		})
	}

	render() {
		return (
			<>
				<RoadmapContainer>
					<RoadmapHeader>
					</RoadmapHeader>
					<RoadmapSubContainer>
						<TimeblockContainer>
							<TimeblockList />
						</TimeblockContainer>
					</RoadmapSubContainer>
				</RoadmapContainer>
				{/*<RoadmapContainer>
					<RoadmapSubContainer>
						<CreateContainer onClick={this.openCreateTimeblockModal}>
							<CreateContent >Create Timeblock</CreateContent>
						</CreateContainer>
						<TimeblockContainer>
							<TimeblockList />
						</TimeblockContainer>
					</RoadmapSubContainer>
				</RoadmapContainer>
				<Modal height="50rem" width="65rem" renderContent={this.renderCreateTimeblock()}
				show={this.state.showCreateTimeblockModal} onDismiss={() => this.closeCreateTimeblockModal()} />*/}
			</>
		);
	}
}



const mapStateToProps = (state, ownProps) => {
	return {
		product: state.productState.products[ownProps.match.params.productID],
	}
}

export default connect(mapStateToProps, { getProductRoadmap, retrieveTimeblocks, getProduct })(Roadmap);



const RoadmapContainer = styled.div`
	display: flex;
	flex-direction: column;
    width: 208rem;	
    height: 103rem;
`

const RoadmapHeader = styled.div`
	background-color: #F0F0F0;
	display: flex;
    width: 208rem;	
    height: 12rem;
`

const RoadmapSubContainer = styled.div`
	display: flex;
	width: 208rem;
	height: 91rem;
`

const TimeblockContainer = styled.div`
	background-color: #F4F5F7;
    display: flex;
    width: 184rem;
	height: 81rem;
	margin-top: 5rem;
	margin-left: 4rem;
`