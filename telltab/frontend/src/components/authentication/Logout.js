import React from 'react';
import { logout } from '../../actions/authentication_actions/Local_Actions';
import { connect } from 'react-redux';
import history from '../../history';

class Logout extends React.Component {
    componentDidMount() {
        const promise = this.props.logout();
        promise.then((result) => {
            history.push('/')
        });
    }
    
    render() {
        return (
            <p></p>
        );
    }
}

export default connect(null, { logout })(Logout);
