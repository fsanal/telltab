import React from 'react';
import styled, {keyframes} from "styled-components";
import ForumUtility from '../general/ForumUtility';
//import Auth from './Auth';


const NavContainer = styled.div`
    height: 8rem;
    background-color: white;
    font-family: 'Muli', sans-serif;
    display: flex;
    margin-top: 1rem;
   
`

const ProductLogo = styled.div`
    height: 8rem;
    margin-left: 4rem;
    font-size: 5rem;
    font-family: 'Muli', sans-serif;
    display:inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 8rem;
    font-weight: 600;
    color: #1EBE6B;
`





const NavBar = () => {
    return (
        <NavContainer>
            <ProductLogo>telltab</ProductLogo>        
            <ForumUtility/>
        </NavContainer>
    )
}

export default NavBar;





