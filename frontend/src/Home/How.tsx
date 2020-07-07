import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        使用法
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">使用法</DialogTitle>
        <DialogContent>
          このサービスは、『HOME』に出てくる賭けの内容についてどちらかに賭ける、ただそれだけのサービスです。
          <br />
          『MY BET』ページでは、自分が今まで賭けた履歴を見ることができます。
          <br />
          『BOARD』ページは、User間の掲示板です。自由に書き込みましょう。
          <br />
          『BUYCOIN』ページは、コインを買うことができます。
          <br />
          さあ『HOME』で自分の好きなコンテンツに賭けてみて『Daily
          Bet』を楽しみましょう！
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
