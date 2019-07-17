import React from 'react';
import { Link } from 'react-router-dom';
import styled, {keyframes} from "styled-components";
import { connect } from 'react-redux';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';
import history from '../../history';
//import Auth from './Auth';


const NavContainer = styled.div`
    height: 8rem;
    background-color: white;
    font-family: 'Muli', sans-serif;
    display: flex;
   /* border-bottom: 0.5px solid #DADCE0;*/
   
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

const SearchBar = styled.input`
    height: 4.5rem;
    width: 54rem;
    border:none;
    :focus {
        outline: none;
    }
    padding-left: 1rem;
    font-size: 3rem;
    margin-top: 1px;
    background-color: ${props => props.color};
`

const SearchBarContainer = styled.div`
    border: ${props => props.border};
    height: 5rem;
    margin-top: 1.5rem;
    margin-left: 26rem;
    width: 60rem;
    border-radius: 0.5rem;
    background-color: ${props => props.color};
`



class ForumUtility extends React.Component {
    constructor() {
        super();
        this.timeout = 0;

        this.state = {
            border: "#DADCE0 solid 0.2rem",
            color: "#F1F3F4",
            className: "fas fa-search productdash__search"
        }
    }

    onFocus() {
        this.setState({border: "#3c40c6 solid 0.2rem",
                        color: "white",
                        className: "fas fa-search productdash__search purple"})
    }

    onBlur() {
        this.setState({border: "#DADCE0 solid 0.2rem",
                        color:  "#F1F3F4",
                        className: "fas fa-search productdash__search"})
    }

    changeColor() {

    }
    
    handleChange = ({target}) => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.retrievePosts(target.value);
        }, 300);
    }
 
    render(){
        return(
            <SearchBarContainer color = {this.state.color} border = {this.state.border}>
                <i className={this.state.className}></i>
                <SearchBar color = {this.state.color} onBlur = {() => this.onBlur()} onFocus = {() => this.onFocus()} onChange = {this.handleChange} type = "text" />
            </SearchBarContainer>
        )
    }   
}

const mapStateToProps = (state) => {
    console.log(state.bucketState.currentBucket);
    return {
        currentBucket: state.bucketState.currentBucket
    }
}

connect(null, { retrievePosts })(ForumUtility);

