import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Odds from "./Odds";
import CircularIndeterminate from "./CircularIndeterminate";

class Mybet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bets: null,
    };
  }

  async componentDidMount() {
    const bets = (
      await axios.get("http://localhost:8080/mybet?email=" + this.props.myemail)
    ).data;
    this.setState({
      bets,
    });
  }
  render() {
    return (
      <div>
        {this.state.bets === null && (
          <div style={{ textAlign: "center", verticalAlign: "center" }}>
            <CircularIndeterminate />
            <p style={{ fontSize: "40px", fontWeight: "bold" }}>Loading...</p>
          </div>
        )}
        {this.state.bets &&
          this.state.bets.map((bet) => (
            <div key={bet.id}>
              <Card
                style={{
                  maxWidth: 500,
                  margin: "50px auto",
                  backgroundColor: "white",
                }}
              >
                {/* <CardMedia
                                component='img'
                                src={`${process.env.PUBLIC_URL}/`+bet.picname}
                                style={{height:'140'}}/> */}

                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ margin: "10px 0 20px 0" }}
                  >
                    {bet.title}
                  </Typography>

                  <div style={{ textAlign: "center" }}>
                    {bet.which === "A" && (
                      <p>
                        <b>{bet.Aname}</b>に<b>{bet.betvalue}コイン</b>
                        賭けました
                      </p>
                    )}
                    {bet.which === "B" && (
                      <p>
                        <b>{bet.Bname}</b>に<b>{bet.betvalue}コイン</b>
                        賭けました
                      </p>
                    )}
                  </div>

                  <div style={{ textAlign: "center" }}>
                    {bet.status === "X" && <p>勝敗はまだ決していません</p>}
                    {bet.status === "A" && (
                      <p>
                        <b>{bet.Aname}</b>の勝利です
                      </p>
                    )}
                    {bet.status === "B" && (
                      <p>
                        <b>{bet.Bname}</b>の勝利です
                      </p>
                    )}
                  </div>

                  <h4>オッズ</h4>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper
                        style={{
                          textAlign: "center",
                          paddingTop: "1px",
                          paddingBottom: "1px",
                          backgroundColor: "#FF6347",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        color="red"
                      >
                        <p>{bet.Aname}</p>
                        <Odds myval={bet.Atotal} coval={bet.Btotal} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        style={{
                          textAlign: "center",
                          paddingTop: "1px",
                          paddingBottom: "1px",
                          backgroundColor: "#4169E1",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <p>{bet.Bname}</p>
                        <Odds myval={bet.Btotal} coval={bet.Atotal} />
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    );
  }
}

Mybet = connect((state) => state)(Mybet);

export default withRouter(Mybet);
