import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import SideNav from './SideNav';
import Forum from './forum/Forum';
import Roadmap from './roadmap/Roadmap';
import Home from './home/Home';

const App = () => {
    return (<>
                <Router history = {history}>
                    <div className = "prodash">
                        <SideNav/>
                        <div className = "prodash__rightcontent">
                            <Route path = "/" exact component = {Forum} />    
                            <Route path = "/home" exact component = {Home} /> 
                        </div>
                    </div>
                </Router>     
            </>)
}

export default App;