import React from 'react';
import styled, {keyframes} from "styled-components";


const DropDownContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const DropDownToggle = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 0.5rem;
    border: #DADCE0 solid 0.1rem
    :hover {
        background-color: #DADCE0;
        color: black;
    }
    margin-left: 5rem;
    text-align: center;
`



const DropDownMenu = styled.ul`
    display: ${props => props.display};
    margin-top: 3rem;
    width: ${props => props.width};
    border: 0.1rem solid black;
    border-radius: 0.2rem;
    white-space: nowrap
    z-index: 2
    position: absolute;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    text-align: center;
    background-color: white;
`

const DropDownItem = styled.li`
    height: 2rem;
    z-index: 2
    left: 0;
    top: 100%;
    width: 100%;
    :hover {
        background-color: #DADCE0;
        color: black;
    }
    font-size: 0.3rem;
`

const Example = styled.div`
    
`



class DropDown extends React.Component {
    constructor() {
        super();
        this.state = {
            display: "none"
        }
    }

    toggleDropDown = () => {
        if (this.state.display == "none") this.setState({display: ""}); else this.setState({display: "none"});
    } 

    render(){
        return(
            <>
                <DropDownContainer >
                    <DropDownToggle onClick = {this.toggleDropDown}>
                        <i class="fas fa-ellipsis-h"></i>
                    </DropDownToggle>
                    <DropDownMenu onClick = {this.toggleDropDown} width =  "7rem" display = {this.state.display}>
                        {this.props.renderBody}
                    </DropDownMenu>
                </DropDownContainer>

            </>
        )
    }   
}

export default DropDown;