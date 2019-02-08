import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './ducks/store'
import routes from './routes'
import logo from './logo.svg'

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
      <img alt="" src={logo} />
        <Provider store={store}> 
          <Router> 
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
