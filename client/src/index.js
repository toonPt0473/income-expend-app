import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers , {} , applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
