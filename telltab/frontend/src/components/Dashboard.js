import React from 'react';
import Forum from './forum/Forum';
import SideNav from './SideNav';
import { Router, Route } from 'react-router-dom';
import history from '../history';

const Dashboard = () => {
    return (<div className = "prodash">
                <SideNav/>
            </div>) 
}

export default Dashboard;