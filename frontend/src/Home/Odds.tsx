import React from "react";

function Odds(props) {
  let a = ((props.myval + props.coval) * 11) / 10 + 100;
  let b = props.coval / 10 + props.myval + 50;
  let odds = Math.round((a / b) * 1000) / 1000;
  return <p style={{ fontSize: "30px", fontWeight: "bold" }}>{odds}</p>;
}

export default Odds;
