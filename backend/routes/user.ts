import express from "express";
import mysql from "mysql";
import { mysql_setting } from "./../mysqlConfig";

const router = express.Router();

router.get("/", (req, res) => {
  const name = req.query.email;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query("SELECT * from User_table WHERE name=?", name, function (
    error,
    results,
    fields
  ) {
    if (results[0] == null) {
      const data = {
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

module.exports = router;
