import React from "react";
import { BrowserRouter , Route , Switch } from 'react-router-dom';
//import { connect } from "react-redux";
//import * as actions from '../action';
//import Header from './Header';
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

class App extends React.Component{
    render(){
      return (
        <BrowserRouter>
            <div>
              <div className='container'>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} exact />
                  <Route component={NotFound} exact />
                </Switch>
              </div>
            </div>
        </BrowserRouter>
      );
    }
};


export default App