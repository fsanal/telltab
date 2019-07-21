import React from 'react';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import styled from "styled-components";
import CreateTimeblock from './CreateTimeblock';
import { getProductRoadmap } from '../../../actions/roadmap_actions/RoadMap_Actions';
import { retrieveTimeBlocks, createTimeblock } from '../../../actions/roadmap_actions/TimeBlock_Actions';
import history from '../../../history';
import Modal from '../../general/Modal';
import TimeblockList from './TimeblockList';

class Roadmap extends React.Component {
	constructor() {
		super();
		this.state = {
			showCreateTimeblockModal: false,
		};
	}

	openCreateTimeblockModal = () => {
		this.setState({ showCreateTimeblockModal: true })
	}

	closeCreateTimeblockModal = () => {
		this.setState({ showCreateTimeblockModal: false })
	}

	renderCreateTimeblock() {
		return (
			<>
				<CreateTimeblock onDismiss={() => this.closeCreateTimeblockModal()} />
			</>
		)
	}

	render() {
		return (
			<>
				<RoadmapContainer>
					<RoadmapSubContainer>
						<UtilityBox>
							<Utility>
								<UtilitySection height="10rem">
									<CreateContainer onClick={this.openCreateTimeblockModal}>
										<CreateContent >Create Timeblock</CreateContent>
									</CreateContainer>
								</UtilitySection>
							</Utility>
						</UtilityBox>
						<TimeblockContainer>
							<TimeblockList />
						</TimeblockContainer>
					</RoadmapSubContainer>
				</RoadmapContainer>
				<Modal height="50rem" width="65rem" renderContent={this.renderCreateTimeblock()}
				show={this.state.showCreateTimeblockModal} onDismiss={() => this.closeCreateTimeblockModal()} />
			</>
		);
	}
}

export default connect(null, { getProductRoadmap, retrieveTimeBlocks, createTimeblock })(Roadmap);

const RoadmapContainer = styled.div`
	display: flex;
	flex-direction: column;
    width: 100%;	
    height: 100%;
`

const RoadmapHeader = styled.div`
	background-color: #32cc24;
	display: flex;
    width: 100%;	
    height: 100%;
`

const RoadmapSubContainer = styled.div`
	background-color: #5924cc;
	display: flex;
	width: 100%;
	height: 78%;
	margin-top: 25rem;
`

const TimeblockContainer = styled.div`
	background-color: #EDE8E7;
    display: flex;
    width: 100%;
	height: 80rem;
	margin-top: 7rem;
`

const UtilityBox = styled.div`
    background-color: #F4F5F7;    
	width: 33rem;
	height: 45rem;
	margin-top: 30rem;
    margin-left: 10rem;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;

`
const Utility = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    height: 40rem;
    width: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    border: "#BFBFBF solid 0.03rem";
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;

`

const UtilitySection = styled.div`
    height: ${props => props.height}
`

const CreateContainer = styled.div`
    display: flex;
    background-color: white
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    cursor:pointer;
    margin-top: 2rem;
    margin-left: auto;
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