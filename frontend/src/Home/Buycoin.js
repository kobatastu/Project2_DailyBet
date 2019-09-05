import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {addR} from '../index';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

class Buycoin extends Component {

    constructor(props){
        super(props);
        this.state = {
            buycoin:0
        }
        this.submit=this.submit.bind(this);
    }

    updateValue(value){
        this.setState({
            buycoin:value
        })
    }

    async submit() {

        let coin = Number(this.state.buycoin)

        let action = addR(coin);
        this.props.dispatch(action);

           
           
            await axios.post('http://localhost:8080/buycoin', {
                coin:coin,
                name:this.props.myemail
            });
        
            this.props.history.push('/login/buycoin');

        
    }

    render(){
        return(
            <div>
                <Card style={{maxWidth:800,margin:'50px auto',backgroundColor:'white'}}>
                    <CardContent>
                        <div style={{marginTop:'30px'}}>
                            <Grid container spacing={3}>
                                <Grid item xs = {6} >
                                    <p>購入コイン量</p>
                                </Grid>
                                <Grid item xs = {6} >
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="number"
                                        label="数量を入力してください"
                                        type="number"
                                        fullWidth
                                        onChange={(e) => {this.updateValue(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{margin:'20px 0px'}}>
                            <Grid container spacing={3}>
                                <Grid item xs = {6} >
                                    <p>現在のレート</p>
                                </Grid>
                                <Grid item xs = {6} >
                                    
                                        <p>0.2JPY/コイン</p>
                                    
                                    
                                </Grid>
                            </Grid>
                        </div>

                        <Divider />

                        <div style={{marginTop:'20px'}}>
                        
                            <Grid container spacing={3}>
                                <Grid item xs = {6} >
                                    <p>購入金額</p>
                                </Grid>
                                <Grid item xs = {6} >
                                    <p>¥{this.state.buycoin*0.2}</p>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{textAlign:'center',margin:'30px auto'}}>

                            <Button variant="contained" color="primary" onClick={this.submit}>
                                購入
                            </Button>

                        </div>
                       

                    </CardContent>
                </Card>

            </div>
            
        )
    }
}

Buycoin = connect((state)=>state)(Buycoin);

export default withRouter(Buycoin);