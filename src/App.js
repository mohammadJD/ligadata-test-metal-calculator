import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Header} from "./_components/header";
import React, {useEffect} from "react";
import {PricesPage} from "./pages/PricesPage";
import {useDispatch, useSelector} from "react-redux";
import {alertActions} from "./_actions";
import { history } from './_helpers';
import {HistoricalPage} from "./pages/HistoricalPage";

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

  return (
      <div className="App">
          <Router history={history}>
              <Header/>
              <div className="jumbotron">
                  <div className="container">
                      <div className="col-md-12">
                          {alert.message &&
                          <div className={`alert ${alert.type}`}>{alert.message}</div>
                          }

                          <Switch>
                              <Route path="/" exact component={PricesPage} />
                              <Route path="/historical" component={HistoricalPage} />
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
