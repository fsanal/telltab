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
import DropDown from './general/DropDown';

import Comment from './Comment';

const App = () => {
    return (<>
                <Router history = {history}>
                    <Route path = "/create_product" exact component = {CreateProduct}/>

                    <Route path = "/roadmap" exact component = {Roadmap} />

                    <Route path = "/" component = {Dashboard} /> 



                    {/*<Route path = "/:productID/roadmap" exact component = {Roadmap} />
                    <Route path = "/:name/roadmap/createRequirement" exact component = {CreateRequirement} />*/}
                    <Route path = "/login" exact component = {Login} />
                    <Route path = "/signup" exact component = {Signup} />
                    <Route path = "/logout" exact component = {Logout} />

                    <Route path = "/dropdown" component = {DropDown}/>

                </Router>     
            </>)
}

export default App;