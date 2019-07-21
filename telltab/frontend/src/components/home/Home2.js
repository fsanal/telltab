import React from 'react';
import { connect } from 'react-redux';
import { retrieveProducts, editProduct, selectProduct, deleteProduct } from '../../actions/global_actions/Product_Actions';
import { getProductForum } from '../../actions/feedback_forum_actions/Forum_Actions';
import { getProductRoadmap } from '../../actions/roadmap_actions/RoadMap_Actions';
import { Link } from 'react-router-dom';
import history from '../../history';
import styled from "styled-components";
import Modal from '../general/Modal';
import CreateProduct from './CreateProduct';
//import Auth from './Auth';


class Home2 extends React.Component {
    constructor(){
        super();
        this.state = {
            showCreatePost: false
        }
    }


    componentDidMount() {
        this.props.retrieveProducts();
    }

    handleSelectProduct(product) {
        this.props.selectProduct(product);
    }

    handleSelectProductRoadmap(product) {
        this.props.selectProduct(product);
    }

    handleDeleteProduct(product) {
        this.props.deleteProduct(product)
    }

    handleOpenCreateModal() {
        this.setState({ showCreatePost: true})
    }

    handleCloseCreateModal() {
        this.setState({ showCreatePost: false})
    }

    renderCreate() {
        return (
            <>
                <CreateProduct onDismiss = {() => this.handleCloseCreateModal()}/>
            </>
        )
    }

    renderList() {
        const { products } = this.props;
        if (products){
            return products.map(product => {
                return (
                    <StyledLink  key = {product._id} to = {`/products/${product._id}/forum`} onClick = {() => {this.handleSelectProduct(product)}} >
                        <Card hoverColor = "#FAFBFC" height = "6rem">
                            <CardProductName>{product.name}</CardProductName>
                            <Button marginLeft = "35%" marginTop = "1rem" height = "4rem" width = "4rem" onClick = {() => {this.handleDeleteProduct(product)}}>
                                <i class="fas fa-trash"></i>
                            </Button>
                        </Card>
                    </StyledLink>
                )
            })
        }
    }



    render() {
        return (
            <>
                <Background>
                    <BoxContainer>
                        <Box>   
                            <Card height = "10rem" >
                                <Header>Products</Header>
                                <Button onClick = {() => this.handleOpenCreateModal()} marginLeft = "45rem" marginTop = "2.5rem" height = "5rem" width = "14rem">Create Product</Button>
                            </Card>
                            {this.renderList()}
                        </Box>
                    </BoxContainer>
                </Background>
                <Modal height = "40rem" width = "65rem" renderContent = {this.renderCreate()} show = {this.state.showCreatePost} onDismiss = {() => this.handleCloseCreateModal()}/>
            </>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        currentProduct: state.productState.currentProduct,
        products: Object.values(state.productState.products)
    }
}

export default connect(mapStateToProps, { retrieveProducts, editProduct, 
    selectProduct, deleteProduct, getProductForum, getProductRoadmap })(Home2);


    
const Background = styled.div` 
    background-color: white;
    width: 100%;
    position: relative;
    overflow: auto;
`;

const BoxContainer = styled.div`
    background-color: #F1F3F4;
    width: 100rem;
    margin-bottom: 5rem;
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -50rem;
    border-radius: 0.5rem;
`


const Box = styled.div`
    margin-top: 5rem;
    margin-bottom: 5rem;
    background-color: white;
    width: 80rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    border: #DADCE0 solid 0.05rem;
    box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
    :last-child {
        border: none;
    }
`


const Button = styled.button`
    background-color:#3c40c6;
    color: white;
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: 2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
        background-color:#575fcf;
    }
    :focus {
        outline: 0;
        box-shadow: none!important;
    }

`

const Card = styled.div`
    height: ${props => props.height} 
    border-bottom: 0px solid #DADCE0;
    display: flex;
    :hover {
        background-color: ${props => props.hoverColor};
    }
`

const Header = styled.div`
    color: #3c40c6;
    font-size: 5rem;
    font-weight: bold;
    vertical-align: middle;
    line-height: 10rem;
    margin-left: 3rem;
`
const StyledLink = styled(Link)`
    text-decoration: none;
`;

const CardProductName = styled.div`
    width: 40rem;
    color: black;
    font-size: 2.5rem;
    vertical-align: middle;
    line-height: 6rem;
    margin-left: 5rem;
    
`

