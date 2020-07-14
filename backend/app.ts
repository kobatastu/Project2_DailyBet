import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mysql from "mysql";
import http from "http";
require("date-utils");

import { mysql_setting } from "./mysqlConfig";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/mybet", require("./routes/mybet"));
app.use("/board", require("./routes/board"));
app.use("/upload", require("./routes/upload"));
app.use("/buycoin", require("./routes/buycoin"));

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("finish");
});

const io = require("socket.io").listen(server);

server.listen(8000, () => {
  console.log("listening on port 8000");
});

const connection = mysql.createConnection(mysql_setting);
connection.connect();

// 接続確立後の通信処理部分を定義
io.on("connection", function (socket) {
  // クライアントからサーバーへ メッセージ送信ハンドラ（自分を含む全員宛に送る）
  socket.on("SEND_MESSAGE", function (value) {
    //データベースに送るためのデータを作成
    let dt: any = new Date();
    dt.setHours(dt.getHours());
    const date = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    const data = { userid: value.userid, contents: value.contents, time: date };

    //データベースに送る
    connection.query("insert into Board_table set ?", data, function (
      error,
      results,
      fields
    ) {
      connection.query(
        "SELECT * FROM User_table WHERE name = ?",
        value.userid,
        function (error2, results2, field2) {
          const data1 = {
            id: results.insertId,
            nicname: results2[0].nicname,
            mypic: results2[0].mypic,
            userid: value.userid,
            contents: value.contents,
            time: date,
          };

          // サーバーからクライアントへ メッセージを送り返し
          io.emit("RECEIVE_MESSAGE", data1);
        }
      );
    });
  });
});

// start the server
app.listen(8080, () => {
  console.log("listening on port 8080");
});
