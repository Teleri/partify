import React, { Component } from "react";
import "./App.css";
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
    loading: true,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div>
        <span>Loading...</span>
      </div>
    ) : (
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
        </Switch>
      </Router>
    );
  }
}

export default App;
