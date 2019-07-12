import React from 'react';
import { connect } from 'react-redux';
import VModal from '../general/VModal';

class AddTag extends React.Component { 
    constructor(){
        super()
        this.currInput = ""; 
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            alert("Show me something")
        }
    }


    render(){
        return (
            <div>
                <input onKeyDown = {this.handleEnter} type ="text" placeholder = "add a tag"/>
                <button>Add tag</button>
            </div>
        )
    }
}

export default AddTag;