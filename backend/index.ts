const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const http = require("http");
const app = express();
require("date-utils");
//データベース準備
const mysql_setting = {
  host: "localhost",
  user: "root",
  password: "",
  database: "******",
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query("SELECT * from Bet_table", function (
    error,
    results,
    fields
  ) {
    const qs = results.map((q) => ({
      id: q.id,
      genre: q.genre,
      title: q.title,
      picname: q.picname,
      contents: q.contents,
      Aname: q.A_name,
      Bname: q.B_name,
      Atotal: q.A_total,
      Btotal: q.B_total,
      time: q.time,
      status: q.status,
    }));
    res.send(qs);
  });
});

app.get("/user", (req, res) => {
  const name = req.query.email;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query("SELECT * from User_table WHERE name=?", name, function (
    error,
    results,
    fields
  ) {
    if (results[0] == null) {
      data = {
        name: name,
        coin: 100,
        nicname: "No name",
        mypic: "default.png",
      };
      connection.query("INSERT INTO User_table set ?", data, function (
        error2,
        results2,
        field2
      ) {
        const cv = {
          coin: 100,
          name: "No name",
          mypic: "default.png",
        };
        res.send(cv);
      });
    } else {
      connection.query(
        "SELECT * from User_table WHERE name = ?",
        name,
        function (error2, results2, field2) {
          let totalcoin = results2[0].coin;

          connection.query(
            'SELECT * FROM Bet_table RIGHT OUTER JOIN Coin_table ON Coin_table.betid=Bet_table.id WHERE userid = ? and kanri = 0 and status != "X"',
            name,
            function (error3, results3, fields3) {
              const array = [];
              for (let i = 0; i < results3.length; i++) {
                array.push(results3[i].id);
                if (
                  results3[i].status == results3[i].which &&
                  results3[i].which == "A"
                ) {
                  let a =
                    ((results3[i].A_total + results3[i].B_total) * 11) / 10 +
                    100;
                  let b = results3[i].B_total / 10 + results3[i].A_total + 50;
                  let odds = Math.round((a / b) * 1000) / 1000;
                  totalcoin = totalcoin + odds * results3[i].betvalue;
                } else if (
                  results3[i].status == results3[i].which &&
                  results3[i].which == "B"
                ) {
                  let a =
                    ((results3[i].A_total + results3[i].B_total) * 11) / 10 +
                    100;
                  let b = results3[i].A_total / 10 + results3[i].B_total + 50;
                  let odds = Math.round((a / b) * 1000) / 1000;
                  totalcoin = totalcoin + odds * results3[i].betvalue;
                }
              }

              const cv = {
                coin: totalcoin,
              };

              connection.query(
                "UPDATE User_table SET ? WHERE name=?",
                [cv, name],
                function (error4, results4, fields4) {
                  const cv1 = {
                    coin: totalcoin,
                    name: results2[0].nicname,
                    mypic: results2[0].mypic,
                  };

                  if (array.length == 0) {
                    res.send(cv1);
                  } else {
                    for (let i = 0; i < array.length; i++) {
                      if (i == array.length - 1) {
                        connection.query(
                          "UPDATE Coin_table SET kanri=1 WHERE id = ?",
                          array[i],
                          function (error5, results5, fields5) {
                            res.send(cv1);
                          }
                        );
                      } else {
                        connection.query(
                          "UPDATE Coin_table SET kanri=1 WHERE id = ?",
                          array[i],
                          function (error5, results5, fields5) {}
                        );
                      }
                    }
                  }
                }
              );
            }
          );

          // connection.query('UPDATE Coin_table SET kanri = 1 WHERE status != X and id = ?',results3[i].id,
          // function(error4,results4,fields4){})
        }
      );
    }
  });
});

app.get("/mybet", (req, res) => {
  const name = req.query.email;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    "SELECT * from Bet_table LEFT OUTER JOIN Coin_table ON Coin_table.betid = Bet_table.id WHERE userid = ? ORDER BY Coin_table.id DESC",
    name,
    function (error, results, fields) {
      console.log(error);

      const qs = results.map((q) => ({
        id: q.id,
        which: q.which,
        betvalue: q.betvalue,
        kanri: q.kanri,
        genre: q.genre,
        picname: q.picname,
        contents: q.contents,
        title: q.title,
        Aname: q.A_name,
        Bname: q.B_name,
        Atotal: q.A_total,
        Btotal: q.B_total,
        time: q.time,
        status: q.status,
      }));
      res.send(qs);
    }
  );
});

app.get("/board", (req, res) => {
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    "SELECT * from User_table RIGHT OUTER JOIN Board_table ON Board_table.userid=User_table.name",
    function (error, results, fields) {
      const qs = results.map((q) => ({
        id: q.id,
        nicname: q.nicname,
        mypic: q.mypic,
        userid: q.userid,
        contents: q.contents,
        time: q.time,
      }));
      res.send(qs);
    }
  );
});

app.post("/upload/name/", (req, res) => {
  const nicname = req.body.nicname;
  const name = req.body.name;

  data = { nicname: nicname };

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query(
    "UPDATE User_table set ? WHERE name = ?",
    [data, name],
    function (error, results, fields) {
      res.send(data);
    }
  );
});

app.post("/upload/file/", (req, res) => {
  const name = req.body.name;
  const now = new Date();
  const time = now.toFormat("YYYYMMDDHH24MISS");

  console.log(req.files);

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  var file_ext = path.extname(req.files.file.name);
  var new_filename = time + req.files.file.md5 + file_ext;

  var target_path_f = "frontend/public/mypic/" + new_filename;

  fs.writeFile(target_path_f, req.files.file.data, (err) => {
    if (err) {
      throw err;
    } else {
      var data = { mypic: new_filename };

      connection.query(
        "update User_table set ? where name = ?",
        [data, name],
        function (error, results, fields) {
          res.send(data);
        }
      );

      connection.end();
    }
  });
});

app.post("/", (req, res) => {
  const id = req.body.id;
  const Atotal = req.body.Atotal;
  const Btotal = req.body.Btotal;
  const name = req.body.name;
  const bet = req.body.bet;

  const userid = req.body.userid;

  data = { userid: userid, betid: id, which: name, betvalue: bet, kanri: 0 };

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query("INSERT INTO Coin_table set ?", data, function (
    error,
    results,
    fields
  ) {
    if (name == "A") {
      const newA = Number(Atotal) + Number(bet);
      const data1 = { A_total: newA };
      connection.query(
        "UPDATE Bet_table SET ? WHERE id = ?",
        [data1, id],
        function (error2, results2, fields2) {
          connection.query(
            "UPDATE User_table SET coin = coin - ? WHERE name = ?",
            [Number(bet), userid],
            function (error3, results3, fields3) {
              p = { Atotal: newA, Btotal: Btotal };
              res.send(p);
            }
          );
        }
      );
    } else {
      const newB = Number(Btotal) + Number(bet);
      const data1 = { B_total: newB };
      connection.query(
        "UPDATE Bet_table SET ? WHERE id = ?",
        [data1, id],
        function (error2, results2, fields2) {
          connection.query(
            "UPDATE User_table SET coin = coin - ? WHERE name = ?",
            [Number(bet), userid],
            function (error3, results3, fields3) {
              p = { Atotal: Atotal, Btotal: newB };
              res.send(p);
            }
          );
        }
      );
    }
  });
});

app.post("/buycoin", (req, res) => {
  const coin = req.body.coin;
  const name = req.body.name;

  data = { coin: coin };

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query(
    "UPDATE User_table SET coin = coin + ? WHERE name = ?",
    [Number(coin), name],
    function (error, results, fields) {
      console.log(error);
      res.send(data);
    }
  );
});

const app2 = express();

app2.use(helmet());
app2.use(bodyParser.json());
app2.use(cors());
app2.use(morgan("combined"));

var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("finish");
});

var io = require("socket.io").listen(server);

server.listen(8000);

var connection = mysql.createConnection(mysql_setting);
connection.connect();

// 接続確立後の通信処理部分を定義
io.on("connection", function (socket) {
  // クライアントからサーバーへ メッセージ送信ハンドラ（自分を含む全員宛に送る）
  socket.on("SEND_MESSAGE", function (value) {
    console.log("ここは通る？");
    console.log(value);

    //データベースに送るためのデータを作成
    var dt = new Date();
    dt.setHours(dt.getHours());
    var date = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    var data = { userid: value.userid, contents: value.contents, time: date };

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
