import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";

import TimeblockList from './TimeblockList';

import { getProduct } from '../../../actions/global_actions/Product_Actions';

class Roadmap extends React.Component {

	componentDidMount() {
		this.props.getProduct(this.props.match.params.productID)
	}

	render() {
		if (!this.props.product) {
			return
		}
		return (
			<>
				<RoadmapContainer>
					<RoadmapSubContainer>
						<TimeblockContainer>
							<TimeblockList />
						</TimeblockContainer>
					</RoadmapSubContainer>
				</RoadmapContainer>
			</>
		);
	}
}



const mapStateToProps = (state, ownProps) => {
	return {
		product: state.productState.products[ownProps.match.params.productID],
	}
}

export default connect(mapStateToProps, { getProduct })(Roadmap);



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
	margin-top: 5rem;
	margin-left: 4rem;
`