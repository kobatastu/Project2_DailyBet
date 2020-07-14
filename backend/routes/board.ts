import express, { Request, Response } from "express";
import mysql from "mysql";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
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

module.exports = router;
