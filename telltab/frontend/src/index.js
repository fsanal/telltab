import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from '../src/reducers/feedback_forum_reducers/index';
const store = createStore(reducers, 
                          compose(
                              applyMiddleware(reduxThunk)
                          ));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)


