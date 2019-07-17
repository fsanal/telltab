import React from 'react';
import styled, {keyframes} from "styled-components";
import { connect } from 'react-redux';
import { retrievePosts } from '../../actions/feedback_forum_actions/Post_Actions';

const SearchBar = styled.input`
    height: 4.5rem;
    width: 54rem;
    border:none;
    :focus {
        outline: none;
    }
    padding-left: 1rem;
    font-size: 3rem;
    background-color: white;
    vertical-align: middle;
    line-height: 6rem;
    ::placeholder { 
        color: #AAAAAA
    }
`

const SearchBarContainer = styled.div`
    border: ${props => props.border};
    height: 6rem;
    margin-top: 1.5rem;
    margin-left: 25.75rem;
    width: 60rem;
    border-radius: 0.4rem;
    background-color: white;
    white-space: nowrap
`

class ForumUtility extends React.Component {
    constructor() {
        super();
        this.timeout = 0;

        this.state = {
            border: "#DADCE0 solid 0.2rem",
            color: "#F1F3F4",
            className: "material-icons productdash__search",
            placeholder: "Search for Feedback..."
        }
    }

    onFocus() {
        this.setState({border: "#3c40c6 solid 0.2rem",
                        color: "white",
                        className: "material-icons productdash__search purple",
                        placeholder: ""})
    }

    onBlur() {
        this.setState({border: "#DADCE0 solid 0.2rem",
                        color:  "#F1F3F4",
                        className: "material-icons productdash__search",
                        placeholder: "Search for Feedback..."})
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
                <i className={this.state.className}>search</i>
                <SearchBar placeholder = {this.state.placeholder} color = {this.state.color} onBlur = {() => this.onBlur()} onFocus = {() => this.onFocus()} onChange = {this.handleChange} type = "text" />
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

export default connect(null, { retrievePosts })(ForumUtility);