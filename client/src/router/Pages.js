import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import Login from '../components/login/Login';

const Pages = () => (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/protected">
            <div>
                protected
            </div>
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path="*">
            <div>
                no match
            </div>
          </Route>
        </Switch>
    </Router>
)

export default Pages;