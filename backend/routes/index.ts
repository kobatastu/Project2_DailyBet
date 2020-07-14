import express, { Request, Response } from "express";
import mysql from "mysql";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
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

router.post("/", (req, res) => {
  const id = req.body.id;
  const Atotal = req.body.Atotal;
  const Btotal = req.body.Btotal;
  const name = req.body.name;
  const bet = req.body.bet;

  const userid = req.body.userid;

  const data = {
    userid: userid,
    betid: id,
    which: name,
    betvalue: bet,
    kanri: 0,
  };

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
              const p = { Atotal: newA, Btotal: Btotal };
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
              const p = { Atotal: Atotal, Btotal: newB };
              res.send(p);
            }
          );
        }
      );
    }
  });
});

module.exports = router;
