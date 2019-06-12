import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DashNav extends React.Component {
    componentDidMount() {
        //this.props.fetchStream(this.props.match.params.id);
    }

    onClick = () => {
        //this.props.deleteStream(this.props.match.params.id);
    }

    

 
    render(){
        return(
            <div className = "navbar">
                <div className = "navbar__item">
                    Map
                </div>
                <div className = "navbar__item">
                    Dash
                </div>
                <div className = "search">
                    <input type = "text" className="search__input" placeholder="Search for feedback">
                </div>
                <div className = "navbar__item">
                    <button>
                        Select All
                    </button>
                    <button>
                        Deselect
                    </button>
                </div>
            </div>
        )
    }   
}

export default DashNav;