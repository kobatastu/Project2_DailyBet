import express, { Request, Response } from "express";
import mysql from "mysql";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
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

module.exports = router;
