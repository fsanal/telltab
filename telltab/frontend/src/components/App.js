import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Forum from './product/forum/Forum';
import Roadmap from './product/roadmap/Roadmap';
import CreateProduct from '../components/home/CreateProduct';
import Dashboard from './Dashboard';
import CreateRequirement from './product/roadmap/CreateRequirement';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import Signup from './authentication/Signup';

import Comment from './Comment';

const App = () => {
    return (<>
                <Router history = {history}>
                    <Route path = "/create_product" exact component = {CreateProduct}/>
                    <Route path = "/" exact component = {Dashboard} /> 
                    <Route path = "/dash" component = {Dashboard} />    
                    <Route path = "/:name/forum" exact component = {Forum} />
                    <Route path = "/:name/roadmap" exact component = {Roadmap} />
                    <Route path = "/:name/roadmap/createRequirement" exact component = {CreateRequirement} />
                    <Route path = "/login" exact component = {Login} />
                    <Route path = "/signup" exact component = {Signup} />
                    <Route path = "/logout" exact component = {Logout} />
                    <Route path = "/home" component = {Dashboard}/>
                </Router>     
            </>)
}

export default App;