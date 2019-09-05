import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {subR} from '../index';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





import Odds from './Odds'
import Alert from './Alert'


class Bets extends Component{

    constructor(props){
        super(props);

        this.state = {
            id:this.props.id,
            Atotal:this.props.Atotal,
            Btotal:this.props.Btotal,
            name:'',
            bet:'',
            open:true
        }

        // this.handleOpen=this.handleOpen.bind(this);
        // this.handleClose=this.handleClose.bind(this);
    }

    updatebet(value) {
        this.setState({
            bet:value,
        })
    }

    updatename(value) {
        this.setState({
            name:value,
        })
    }

    // handleOpen(){
    //     this.setState({open:true})
    // }
    // handleClose(){
    //     this.setState({open:false})
    // }

    async submit() {

        if(this.props.mycoin<this.state.bet){

            // return(
            //     <div>
            //         <Alert />
            //     </div>
            // )
            

            alert('コインが足りません')
        }else{

            if (this.state.name==="A"){
                let newA = this.state.Atotal + Number(this.state.bet)
                this.setState({
                    Atotal:newA
                })
            }else{
                let newB = this.state.Btotal + Number(this.state.bet)
                this.setState({
                    Btotal:newB
                })
            }

            let action = subR(this.state.bet);
            this.props.dispatch(action);

           
           
            await axios.post('http://localhost:8080', {
                id:this.state.id,
                Atotal:this.state.Atotal,
                Btotal:this.state.Btotal,
                name:this.state.name,
                bet:this.state.bet,
                userid:this.props.myemail
            });
        
            this.props.history.push('/login');

        }
    }

    render(props){
        return(
            <div>
                <h4>オッズ</h4>
                <Grid container spacing={3}>
                    <Grid item xs = {6} >
                        <Paper style={{textAlign:'center',paddingTop:'1px',paddingBottom:'1px',backgroundColor:'#FF6347',color:'white',fontWeight:'bold'}} color="red">
                            <p>{this.props.Aname}</p>
                            <Odds myval={this.state.Atotal} coval={this.state.Btotal}/>
                        </Paper>
                    </Grid>
                    <Grid item xs = {6} >
                        <Paper style={{textAlign:'center',paddingTop:'1px',paddingBottom:'1px',backgroundColor:'#4169E1',color:'white',fontWeight:'bold'}} >
                            <p>{this.props.Bname}</p>
                            <Odds myval={this.state.Btotal} coval={this.state.Atotal}/>
                        </Paper>
                    </Grid>
                </Grid>
               
                <div style={{textAlign:'center'}} >
                    <FormControl style={{marginTop:'10px',marginBottom:'20px'}}>
                        <InputLabel >選択してください</InputLabel>
                        <Select
                            native
                            onChange = {(e) => {this.updatename(e.target.value)}}
                        >
                            <option value=""  ></option>
                            <option value="A" >{this.props.Aname}</option>
                            <option value="B" >{this.props.Bname}</option>
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off" style={{marginBottom:'20px'}}>
                        <TextField
                            type="number" 
                            placeholder="賭ける額を入力してください"
                            onChange = {(e) => {this.updatebet(e.target.value)}}
                        />
                    </form>

                  
                    <Button
                        variant = "outlined"
                        color="secondary"
                        onClick={() => {this.submit()}} 
                        style={{marginBottom:'20px'}}
                    >
                        Bet
                    </Button>
                </div>
            
            </div>

        )
    }
};

Bets = connect((state)=>state)(Bets);

export default withRouter(Bets);