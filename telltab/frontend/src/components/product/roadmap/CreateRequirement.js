import React from 'react';
import styled, {keyframes} from "styled-components";

class CreateRequirement extends React.Component {
    constructor() {
        super();
        this.createInput = React.createRef();
        this.state = {
            textAreaOpen: false
        }
    }

    setTextArea() {
        this.setState(prevState => ({textAreaOpen: !prevState.textAreaOpen}));
    }

    createRequest(e) {
        this.props.onCreateReq({title: e.target.value})/*{title: e.target.value})*/
    }
    

    render(){
        let elem;
        if (this.state.textAreaOpen) {
            elem = <ReqTextArea autoFocus onBlur = {() => this.setTextArea()}
            onKeyPress = {(e) => {if (e.key === 'Enter') {this.createInput.current.blur(); this.createRequest(e)}}}
            ref={this.createInput}/>
        } else {
            elem = <CreateCard onClick = {() => this.setTextArea()}>+</CreateCard>
        }
        return (
            <>
                {elem}
            </>
        )
    }   
}

export default CreateRequirement;


const TimeBlock = styled.div`
     display: flex;
     background-color: black;
     height: 60rem;
     border-radius: 0.5rem;
     margin-left: auto;
     margin-right: auto;
     margin-bottom: 2rem;
     border: "#BFBFBF solid 0.03rem";
    
     /*
     border: #DADCE0 solid 0.05rem;
     box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
     */
     width: 30rem;
`

const CreateCard = styled.div`
display: flex;
background-color: white;
height: 10rem;
border-radius: 0.5rem;
margin-top: 5rem
margin-left: auto;
margin-right: auto;
border: "#BFBFBF solid 0.03rem";
text-align: center;
vertical-align: middle;
line-height: 10rem;
font-size: 10rem;
/*
border: #DADCE0 solid 0.05rem;
box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px, rgba(23, 43, 77, 0.2) 0px 0px 1px;
*/
width: 20rem;
`

const ReqTextArea = styled.textarea`
    height: 20rem;
    width: 20rem;
`
