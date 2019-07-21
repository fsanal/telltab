import React from 'react';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import styled from "styled-components";
import { getProduct } from '../../../actions/global_actions/Product_Actions';
import { getProductRoadmap } from '../../../actions/roadmap_actions/Roadmap_Actions';
import { retrieveTimeblocks, createTimeblock } from '../../../actions/roadmap_actions/Timeblock_Actions';
import history from '../../../history';
import CreateTimeblock from './CreateTimeblock';
import EditTimeblock from './EditTimeblock';
import TimeblockList from './TimeblockList';
import Req from './Req';
import Modal from '../../general/Modal';

class Roadmap extends React.Component {

	constructor() {
		super();
		this.state = {
			showCreateTimeblockModal: false,
			showEditTimeblockModal: false
		};
	}

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

	render() {
		return (
			<>
				<RoadmapContainer>
					<RoadmapHeader>
						<CreateContainer onClick={this.openCreateTimeblockModal}>
							<CreateContent >Create Timeblock</CreateContent>
						</CreateContainer>
						<Modal height="50rem" width="65rem" renderContent={this.renderCreateTimeblock()}
							show={this.state.showCreateTimeblockModal} onDismiss={() => this.closeCreateTimeblockModal()} />
						<Modal height="50rem" width="65rem" renderContent={this.renderEditTimeblock()}
									show={this.state.showEditTimeblockModal} onDismiss={() => this.closeEditTimeblockModal()} />
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

export default connect(mapStateToProps, { getProductRoadmap, retrieveTimeblocks, createTimeblock, getProduct })(Roadmap);



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

const CreateContainer = styled.div`
    display: flex;
    background-color: white
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    cursor:pointer;
    margin-top: 2rem;
    margin-left: 162rem;
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