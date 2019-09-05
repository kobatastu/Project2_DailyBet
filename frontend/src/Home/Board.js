import React,{Component} from 'react';
import io from "socket.io-client"
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularIndeterminate from './CircularIndeterminate'

class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
            message:'',
            messages:[]
        }

        this.socket=io('localhost:8000');

        const addMessage = data => {
            this.setState({messages:[...this.state.messages,data]})
        }
        
        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE',{
                userid:this.props.myemail,
                contents:this.state.message

            })
            this.setState({message:''})
        }

        this.socket.on('RECEIVE_MESSAGE',function(data){
            console.log(data)
            addMessage(data)
            let obj = document.getElementById("box");
            obj.scrollTop = obj.scrollHeight;
        })

    }


    async componentDidMount(){
        const messages = (await axios.get('http://localhost:8080/board')).data;
        this.setState({
            messages,
        })
    }

    render(){
        
        return(
            <div>
                {
                    this.state.messages === [] && 
                    <div style={{textAlign:'center',verticalAlign:'center'}}>
                        <CircularIndeterminate/>
                        <p style={{fontSize:'40px',fontWeight:'bold'}}>Loading...</p>
                    </div>
                }
                <Card style={{maxWidth:1000,margin:'50px auto',backgroundColor:'white'}}>
                    <CardContent>
                        <div style={{paddingBottom:'10px'}}>
                            <h2>Board</h2>
                            <p>みんなで情報を共有しましょう</p>
                        </div>
                        <div id='box' style={{height:'500px',overflow:'scroll'}}>
                            {this.state.messages.map(message => {
                                return (
                                    <div key={message.id} style={{padding:'20px',borderTop:'solid 1px rgb(189, 186, 186)'}}>
                                  
                                    

                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <img 
                                                    alt='プロフィール画像'
                                                    src={`${process.env.PUBLIC_URL}/mypic/`+message.mypic}
                                                    style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover',margin:'20px 20px 20px 20px'}}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacong={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom varient="subtitle">
                                                            {message.nicname}
                                                        </Typography>
                                                        <Typography varient="body2" gutterBottom color='textSecondary'>
                                                            {message.contents}
                                                        </Typography>

                                                    </Grid>
                                                    
                                                </Grid>
                                                <Grid item>
                                                    <Typography varient="subtitle1">
                                                        {message.time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                             
                                
                                 </div>
                                )
                            })}
                        </div>
                        <div style={{textAlign:'center',padding:'20px 0 20px 0'}}>
                            <form noValidate autoComplete='off' onSubmit={this.sendMessage}>
                                <TextField 
                                    type='text' 
                                    label='メッセージを入力してください'
                                    value={this.state.message} 
                                    onChange={ev => this.setState({message: ev.target.value})}
                                    style = {{width:'70%'}}
                                />
                                <input 
                                    type='hidden'
                                    value={this.props.myemail}
                                />
                                <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Board = connect((state)=>state)(Board);

export default withRouter(Board);