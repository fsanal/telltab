import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import SideNav from './SideNav';
import Forum from './forum/Forum';
import Roadmap from './roadmap/Roadmap';
import Home from './home/Home';
import CreateProduct from '../components/home/CreateProduct';
import Dashboard from './Dashboard';
import CreatePost from './forum/CreatePost';

const App = () => {
    return (<>
                <Router history = {history}>
                    <Route path = "/create_product" exact component = {CreateProduct}/>
                    <Route path = "/home" exact component = {Home} /> 
                    <Route path = "/dash" component = {Dashboard} />    
                    <Route path = "*/forum" exact component = {Forum} />
                    <Route path = "*/forum/create" exact component = {CreatePost} />
                    <Route path = "*/roadmap" exact component = {Roadmap} />
                </Router>     
            </>)
}

export default App;