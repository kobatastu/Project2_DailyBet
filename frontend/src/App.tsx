import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./NavBar/NavBar";
import Main from "./Home/Main";
import Login from "./Login/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Main} />
      </div>
    );
  }
}
//ストアのコネクト
App = connect()(App);

export default App;
