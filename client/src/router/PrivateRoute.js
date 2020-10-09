import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class Auth {
    constructor() {
        this._authenticated = false;
    }

    isAuthenticated() {
        // check for token in local storage
        this._authenticated = true;
        return this._authenticated;
    }
}

const auth = new Auth();

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export { PrivateRoute as default, auth};