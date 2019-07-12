import React from 'react';
import history from '../../history';

class RoadMapNav extends React.Component {

    goHome = () => {
        history.push('/');
    }

    render(){
        return(
            <div className = "dashcontent__dashnav">
                <div onClick = {() => {this.goHome()}} className = "dashcontent__logo">telltab</div>
            </div>
        )
    }   
}

export default RoadMapNav;