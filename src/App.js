import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Header} from "./_components/header";
import React from "react";
import {PricesPage} from "./pages/PricesPage";

function App() {
  return (
      <div className="App">
          <Router>
              <Header/>
              <div className="jumbotron">
                  <div className="container">
                      <div className="col-md-12">
                          {/*{alert.message &&*/}
                          {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
                          {/*}*/}

                          <Switch>
                              <Route path="/" exact component={PricesPage} />
                              <Redirect from="*" to="/" />
                          </Switch>

                      </div>
                  </div>
              </div>
          </Router>
      </div>
  );
}

export default App;
