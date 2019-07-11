import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';

class ForumNav extends React.Component {
    componentDidMount() {
        //this.props.fetchStream(this.props.match.params.id);
    }

    goHome = () => {
        history.push('/');
    }

    

 
    render(){
        return(
            <div className = "dashcontent__dashnav">
                <div onClick = {() => {this.goHome()}} className = "dashcontent__logo">telltab</div>
            </div>
            /*
            <i className="dashcontent__createpost fas fa-plus-circle"></i>
            <div className = "dashcontent__search">
                    <input type = "text" className="dashnav__searchinput" placeholder="Search for feedback"/>
                </div>
            <div className = "dashnav">
                <div className = "dashnav__logo">
                    TellTab
                </div>
                <div className = "dashnav__postfeed">
                    +
                </div>
                <div className = "dashnav__search">
                    <input type = "text" className="dashnav__searchinput" placeholder="Search for feedback"/>
                </div>
            </div>
            */
        )
    }   
}

export default ForumNav;