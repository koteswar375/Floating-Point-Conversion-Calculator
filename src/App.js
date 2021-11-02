import React, { useEffect, useState } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Conversion from './components/Conversion';
import Operations from './components/Operations';
import History from './components/History';
import Home from './components/Home';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "IEEE 754 Converter"
  }, [])

  const handleEnter = (event) => {
    if(event.key === "Enter") {
      setLoggedIn(true);
    }
  }

  return (
    <Router>
      <div className="App">
        {loggedIn ?
          <header className="App-header">
            <div className="menu">
              {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
              <NavLink activeClassName="active" to="/conversion">Conversion</NavLink>
              <NavLink activeClassName="active" to="/operations">Operations</NavLink>
              <NavLink activeClassName="active" to="/history">History</NavLink>
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/operations">
                <Operations />
              </Route>
              <Route path="/conversion">
                <Conversion />
              </Route>
              <Route path="/history">
                <History />
              </Route>
            </Switch>
          </header>
          : <Home handleEnter = {handleEnter}/>}
      </div>
    </Router>
  );
}

export default App;
