import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addN } from "../../index";
import { addP } from "../../index";

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nicname: "",
      file: "",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
    this.submit1 = this.submit1.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  updateName(val) {
    this.setState({
      nicname: val,
    });
  }

  updateFile(val) {
    this.setState({
      file: val,
    });
  }

  submit() {
    if (this.state.nicname === "") {
      alert("ニックネームを入力してください");
    } else {
      let action = addN(this.state.nicname);
      this.props.dispatch(action);

      axios.post("http://localhost:8080/upload/name", {
        nicname: this.state.nicname,
        name: this.props.myemail,
      });
    }
  }

  submit1() {
    if (this.state.file === "") {
      alert("プロフィール画像を入力してください");
    } else {
      const params = new FormData();
      params.append("file", this.state.file);
      // params.append('name',this.props.myemail)
      console.log(params);
      console.log(this.state.file);
      axios
        .post("http://localhost:8080/upload/file", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (result) {
          let action = addP(result.mypic);
          this.props.dispatch(action);
        });
    }
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          プロフィール更新
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">プロフィール更新</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ニックネームとプロフィール画像を更新しましょう。
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="ニックネーム"
              type="text"
              // fullWidth
              onChange={(e) => {
                this.updateName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.submit}
              style={{ margin: "0 0 0 auto" }}
            >
              更新
            </Button>
            <form encType="multipart/form-data">
              <div style={{ margin: "20px 0px" }}>
                <Button component="label" variant="outlined" color="primary">
                  プロフィール画像送信
                  <input
                    type="file"
                    style={{
                      opacity: "0",
                      appearance: "none",
                      position: "absolute",
                    }}
                    accept="image/jpeg,image/gif,image/png"
                    onChange={(e) => {
                      this.updateFile(e.target.files[0]);
                    }}
                    name="file"
                  />
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.submit1}
                  style={{ margin: "0 0 0 auto" }}
                >
                  更新
                </Button>
              </div>
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UpdateForm = connect((state) => state)(UpdateForm);

export default withRouter(UpdateForm);

////////////////////////

// export default function FormDialog(props) {
//   const [open, setOpen] = React.useState(false);
//   const [nicname, changeName] = React.useState('');

//   function handleClickOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

//   function updateName(val){
//     changeName(val)
//   }

//   function updateFile(){

//   }

//   // function mapDispatchToProps(dispatch){
//   //   return{
//   //     addContents(text){
//   //       dispatch(addN(text))
//   //     }
//   //   }
//   // }

// function submit() {

//     if(nicname===''){
//         alert('ニックネーム、プロフィール画像を入力してください')
//     }else{

//         axios.post('http://localhost:8080/upload/name', {
//           nicname:nicname,
//           name:props.myemail
//         }).then(function(){
//             // let action = addN(nicname);
//             // store.dispatch(nicname);

//             this.history.push('/login');

//         })
//     }
// }

// function submit1() {

//   if(this.props.mycoin<this.state.bet){
//       alert('ニックネーム、プロフィール画像を入力してください')
//   }else{

//     let params = new FormData();
//     // params.append('image',file)
//     // params.append('name',name)

//       axios.post('http://localhost:8080/upload', params, {
//         headers:{
//           'Content-Type':'multipart/form-data',
//         }
//       }).then(function(){
//           let action = addN(this.state.bet);
//           let action2 = addP(this.state.bet);
//           this.props.dispatch(action);
//           this.props.dispatch(action2);

//           this.props.history.push('/login');

//       })
//   }
// }

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         プロフィール更新
//       </Button>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">プロフィール更新</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//               ニックネームとプロフィール画像を更新しましょう。
//           </DialogContentText>

//             <TextField
//                 autoFocus
//                 margin="dense"
//                 id="name"
//                 label="ニックネーム"
//                 type="text"
//                 // fullWidth
//                 onChange={(e) => {updateName(e.target.value)}}
//             />
//             <Button
//                 variant = "contained"
//                 color="secondary"
//                 onClick={submit}
//                 style={{margin:'0 0 0 auto'}}
//             >
//                 更新
//             </Button>
//           <form encType="multipart/form-data">
//             <div style={{margin:'20px 0px'}}>
//                 <Button component='label' variant='outlined' color='primary'>
//                     プロフィール画像送信
//                 <input
//                     type="file"
//                     style={{opacity:'0',appearance:'none',position:'absolute'}}
//                     accept="image/jpeg,image/gif,image/png"
//                     onChange = {(e) => {updateFile(e.target.files[0])}}
//                 />
//                 </Button>

//                 <Button
//                 variant = "contained"
//                 color="secondary"
//                 onClick={submit1}
//                 style={{margin:'0 0 0 auto'}}
//                 >
//                     更新
//                 </Button>

//             </div>
//           </form>

//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             閉じる
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
