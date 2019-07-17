import React from 'react';
import styled, {keyframes} from "styled-components";
import ProductSideNav from './ProductSideNav';
import ProductNavBar from './ProductNavBar'
import Forum from './forum/Forum';
import { Router, Route } from 'react-router-dom';
import history from '../../history';
//import Auth from './Auth';

const ProductContainer = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    /*background-color: #F4F5F7;*/
    overflow: scroll;
`



const ProductDash = () => {
    return (
        <>
            <ProductSideNav />
            <ProductContainer>
                <ProductNavBar/>
                <Router history = {history}>
                    <Route path = "/home/products/:name/forum" component = {Forum}/>
                </Router>
            </ProductContainer>
        </>
    )
}

export default ProductDash;