import React from 'react';
import Forum from './product/forum/Forum';
import ProductDash from './product/ProductDash';
import TellTabSideNav from './TellTabSideNav';
import Home2 from './home/Home2';
import { Router, Route } from 'react-router-dom';
import history from '../history';

const Dashboard = () => {
    return (<div className = "container">
                <TellTabSideNav/>
                <Router history = {history}>
                    <Route path = "/" exact component = {Home2}/>
                    <Route path = "/products/:productID" component = {ProductDash}/>
                </Router>  
            </div>) 
}

export default Dashboard;