import React from 'react';
import { Link } from 'react-router-dom';
import styled, {keyframes} from "styled-components";
//import Auth from './Auth';


const SideNav = styled.div` 
    display: flex;
    flex-direction: column;
    width: 10rem;
    background-color: white;
    height: 100vh;
    border-right: 2px solid #F4F5F7;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.2);
    padding-right: 5rem;
    overflow: hidden;
`;

const StyledLink = styled(Link)`
    border-radius: 50%;
    :hover {
        background-color: #DADCE0;
    }
    width: 8rem;
    height: 8rem;
    margin-left: 1rem;
    margin-top: ${props => props.margintop};
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
`;

const ProductSideNav = () => {
    return (
        <SideNav className = "rat">
            <StyledLink margintop = "8rem" to = "/map">
                <i className="fas fa-comments"></i>
            </StyledLink>
            <StyledLink margintop = "3rem" to = "/">
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

export default ProductSideNav;