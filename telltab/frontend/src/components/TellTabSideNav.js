import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import './product/ProductSideNav'
//import Auth from './Auth';

const SideNav = styled.div` 
    display: flex;
    flex-direction: column;
    width: 7rem;
    background-color: #1EBE6B;
    height: 100vh;
    overflow: hidden;
    padding-right: 7rem;
`;

const StyledLink = styled(Link)`
    border-radius: 50%;
    :hover {
        background-color: #575fcf;
    }
    margin-left: 0.5rem;
    margin-top: ${props => props.margintop};
    width: 6rem;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
`;

const Logo = styled.span` 
    font-size: 7rem;
    color: white;
`;

const TellTabSideNav = () => {
    return (
        <SideNav>
            <StyledLink margintop = "3rem" to = "/">
                    <Logo>t</Logo>
            </StyledLink>
            <StyledLink margintop = "55rem" to = "/products">
            <i class="fas fa-cog"></i>
            </StyledLink>
        </SideNav>
    )

}

export default TellTabSideNav;