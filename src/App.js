import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';
import Home from './Home/home';
import Profile from './Profile/profile';

const oktaAuth = new OktaAuth({
  issuer: 'https://localhost:8000/oauth2/default',
  clientId: '0oa7y1fvreUXXbM0m5d7',
  redirectUri: window.location.origin + '/login/callback'
});

class App extends Component {

  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
  }

  render() {
    return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/login/callback" component={LoginCallback}/>
        <SecureRoute path="/profile" component={Profile}/>
      </Security>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (<Router><AppWithRouterAccess/></Router>);
  }
}

export default RouterApp;

