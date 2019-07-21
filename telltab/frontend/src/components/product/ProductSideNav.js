import React from 'react';
import { Link } from 'react-router-dom';
import styled, {keyframes} from "styled-components";
import {withRouter} from 'react-router'
//import Auth from './Auth';


const SideNav = styled.div` 
    display: flex;
    flex-direction: column;
    width: 10rem;
    background-color: white;
    height: 100vh;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.2);
    padding-right: 5rem;
    overflow: hidden;
    margin-right: 0.8rem;
`;

const StyledLink = styled(Link)`
    border-radius: 50%;
    :hover {
        background-color: #DADCE0;
        color: #3c40c6;
    }
    width: 8rem;
    height: 8rem;
    margin-left: 1rem;
    margin-top: ${props => props.margintop};
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #575fcf;
    font-size: 3.5rem;
`;

const ProductSideNav = (props) => {
        return (
            <SideNav className = "rat">
                <StyledLink margintop = "8rem" to = {`/products/${props.match.params.productID}/forum`}>
                    <i className="fas fa-comments"></i>
                </StyledLink>
                <StyledLink margintop = "3rem" to = {`/products/${props.match.params.productID}/roadmap`}>
                    <i className="fas fa-map"></i>
                </StyledLink>
                <StyledLink margintop = "3rem" to = "/analytics">
                    <i className="fas fa-chart-pie"></i>
                </StyledLink>
                <StyledLink margintop = "3rem" to = "/actions">
                    <i className="fas fa-briefcase"></i>
                </StyledLink>
            </SideNav>
        )
}

export default withRouter(ProductSideNav);