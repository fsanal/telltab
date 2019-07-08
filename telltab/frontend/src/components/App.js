import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import SideNav from './SideNav';
import Forum from './forum/Forum';
import Roadmap from './roadmap/Roadmap';
import Home from './home/Home';
import CreateProduct from '../components/home/CreateProduct';

const App = () => {
    return (<>
                <Router history = {history}>
                    <div className = "prodash">
                        <div className = "prodash__rightcontent">
                            <Route path = "/" exact component = {Forum} />    
                            <Route path = "/create_product" exact component = {CreateProduct}/>
                            <Route path = "/home" exact component = {Home} /> 
                        </div>
                    </div>
                </Router>     
            </>)
}

export default App;