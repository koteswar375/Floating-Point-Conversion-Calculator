import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  withRouter,
  Route,
  NavLink
} from "react-router-dom";
import Conversion from './components/Conversion';
import Operations from './components/Operations';
import History from './components/History';
import Home from './components/Home';
import URL from './config';
import {HistoryProvider} from './Contexts/history.context';



function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    document.title = "IEEE 754 Converter";
    // getHistory();
  }, []);


  // const getHistory = () => {
  //     axios.get(`${URL}/items`)
  //           .then((res) => {
  //               console.log(res)
  //               setData(res.data);
  //           })
  //           .catch((error) => {
  //               console.log(error)
  //               alert("Invalid inputs")
  //           })
  // }

  const handleEnter = (event) => {
    if(event.key === "Enter") {
      props.history.push("/conversion");
      setLoggedIn(true);
    }
  }

  return (
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
              <HistoryProvider>
              <Route path="/operations">
                <Operations />
              </Route>
              <Route path="/conversion">
                <Conversion />
              </Route>
              <Route path="/history">
                <History/>
              </Route>
              </HistoryProvider>
            </Switch>
          </header>
          : <Home handleEnter = {handleEnter}/>}
      </div>
  );
}

export default withRouter(App);
