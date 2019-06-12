import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';

const App = () => {
    return <div>
                <Router history = {history}>
                    <div>
                        <Navbar/>

                        <Route path = "/" exact component = {Dashboard}/>
                    </div>
                </Router>     
          </div>;
}

export default App;