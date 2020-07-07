import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Mycoin from "./Mycoin";
import How from "./How";
import UpdateForm from "./UpdateForm";

class SideBar extends Component {
  // constructor(props){
  //     super(props);
  // }

  bar = {
    position: "sticky",
    marginBottom: "50px",
  };

  render() {
    return (
      <Drawer variant="permanent" anchor="left" style={{ textAlign: "center" }}>
        <img
          alt="プロフィール画像"
          src={`${process.env.PUBLIC_URL}/mypic/` + this.props.mypic}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            margin: "50px auto 10px auto",
          }}
        />
        <p>
          <b>{this.props.name}</b>
        </p>
        <List style={{ width: 200 }}>
          <div style={this.bar}>
            <p>保有コイン</p>
            <Mycoin />
          </div>
        </List>
        <Divider />

        <div style={{ margin: "30px 0" }}>
          <How />
        </div>

        <UpdateForm />
      </Drawer>
    );
  }
}

SideBar = connect((state) => state)(SideBar);

export default withRouter(SideBar);
