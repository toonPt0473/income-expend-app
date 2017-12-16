import React from "react";
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import EditList from './components/EditList'

class App extends React.Component{
    render(){
      return (
        <BrowserRouter>
            <div>
              <div className='container'>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} exact />
                  <Route path="/dashboard/:id" component={EditList} exact />
                  <Route component={NotFound} exact />
                </Switch>
              </div>
            </div>
        </BrowserRouter>
      );
    }
};


export default App