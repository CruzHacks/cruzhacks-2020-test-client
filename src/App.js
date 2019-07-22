import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Nav from "./NavBar/NavBar";
import Auth from "./Auth/Auth";
import Callback from "./Callback/Callback";
import Public from "./PublicRoute/Public";
import Private from "./Private/Private";
//import Courses from "./Courses";
import PrivateRoute from "./Private/PrivateRoute";
import AuthContext from "./Auth/AuthContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth } = this.state;
    // Show loading message until the token renewal check is completed.
    if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} />
          {/* <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
          /> */}
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
