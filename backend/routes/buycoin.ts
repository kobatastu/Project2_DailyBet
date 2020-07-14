import express, { Request, Response } from "express";
import mysql from "mysql";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const coin = req.body.coin;
  const name = req.body.name;
  const data = { coin: coin };
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

module.exports = router;
