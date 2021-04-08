import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from "./services/firebase";
import landingPage from "./containers/landingPage/landingPage";
import signUpPage from "./containers/signUpPage/signUpPage";
import theRoomPage from "./containers/theRoomPage/theRoomPage";
import logInPage from "./containers/logInPage/logInPage";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}

class App extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
        });
      } else {
        this.setState({
          authenticated: false,
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            component={theRoomPage}
          />
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={signUpPage}
          />
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={logInPage}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
