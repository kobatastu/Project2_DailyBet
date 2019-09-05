import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Odds from './Odds'

class Finish extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div style={{textAlign:'center' ,color:'red'}}>
                    {this.props.status==='X' && <p>Bet期間は終了いたしました</p>}
                    {this.props.status==='A' && <p>{this.props.Aname}の勝利です</p>}
                    {this.props.status==='B' && <p>{this.props.Bname}の勝利です</p>}
                </div>
                <h4>最終オッズ</h4>

                <Grid container spacing={3}>
                    <Grid item xs = {6} >
                        <Paper style={{textAlign:'center',paddingTop:'10px',paddingBottom:'10px',backgroundColor:'#FF6347',color:'white',fontWeight:'bold'}} color="red">
                            <p>{this.props.Aname}</p>
                            <Odds myval={this.props.Atotal} coval={this.props.Btotal}/>
                        </Paper>
                    </Grid>
                    <Grid item xs = {6} >
                        <Paper style={{textAlign:'center',paddingTop:'10px',paddingBottom:'10px',backgroundColor:'#4169E1',color:'white',fontWeight:'bold'}} >
                            <p>{this.props.Bname}</p>
                            <Odds myval={this.props.Btotal} coval={this.props.Atotal}/>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default Finish;