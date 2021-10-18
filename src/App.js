import React, { useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from './components/Home';
import Operations from './components/Operations';



function App() {
  useEffect(() => {
    document.title = "IEEE 754 Converter"
  }, [])

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="menu">
                <NavLink exact activeClassName="active" to="/">Conversion</NavLink>
                <NavLink activeClassName="active" to="/about">Operations</NavLink>
          </div>
          <Switch>
            <Route path="/about">
              <Operations />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </header>
      </div>


    </Router>
  );
}

export default App;
