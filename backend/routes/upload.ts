import express, { Request, Response } from "express";
import mysql from "mysql";
import path from "path";
import fs from "fs";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.post("/name/", (req: Request, res: Response) => {
  const nicname = req.body.nicname;
  const name = req.body.name;
  const data = { nicname: nicname };

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

router.post("/file/", (req: any, res: Response) => {
  const name = req.body.name;
  const now: any = new Date();
  const time = now.toFormat("YYYYMMDDHH24MISS");

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const file_ext = path.extname(req.files.file.name);
  const new_filename = time + req.files.file.md5 + file_ext;
  const target_path_f = "frontend/public/mypic/" + new_filename;
  fs.writeFile(target_path_f, req.files.file.data, (err) => {
    if (err) {
      throw err;
    } else {
      const data = { mypic: new_filename };
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

module.exports = router;
