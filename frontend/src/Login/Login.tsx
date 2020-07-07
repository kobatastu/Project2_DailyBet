import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div style={{ position: "relative", backgroundColor: "black" }}>
        <img
          alt="ログイン画面"
          src={`${process.env.PUBLIC_URL}/backgroundpic.jpg`}
          style={{ width: "100%", opacity: "0.6" }}
        />
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "15%",
            color: "white",
            fontSize: "50px",
            fontFamily: "Verdana",
          }}
        >
          <b>
            ENJOY GAMBLE
            <br />
            IN YOUR DAILY LIFE.
          </b>
        </div>
      </div>
    );
  }
}

export default Login;
