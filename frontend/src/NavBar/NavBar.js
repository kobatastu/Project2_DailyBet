import React,{Component} from 'react';
import {Route,Link, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import firebase from '../firebase'
import {addR} from '../index';
import {addE} from '../index';
import {addN} from '../index';
import {addP} from '../index';




 

  


class NavBar extends Component {

    

    constructor(props){
        super(props);
        this.state={
            user:null,
          
        }
        this.aex = this.aex.bind(this);
       

    }

    async aex(){
      
    
        if(this.state.user){
            const bet = (await axios.get('http://localhost:8080/user?email='+this.state.user.email)).data;
             
           

            let action = addR(bet.coin);
            let action2 = addE(this.state.user.email);
            let action3 = addN(bet.name);
            let action4 = addP(bet.mypic);
            this.props.dispatch(action);
            this.props.dispatch(action2);
            this.props.dispatch(action3);
            this.props.dispatch(action4);
        }
    }


async componentDidMount() {
        await firebase.auth().onAuthStateChanged(user => {
          
    
            this.setState({ 
                user
            })

            this.aex();
        });
    
}
    
login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
}

logout() {
    // let action5 = addE('');
    // console.log(action5)
    console.log('こっち')
    // this.props.dispatch(action5)
    // console.log('ここ')
    firebase.auth().signOut()
    // return(
      
    //         <Redirect to='/'/>
    // )
    

}

color = {
    color: 'white'
}

    
    render(){

    return (
        <div>
                {this.state.user ? (
                    <div style={{paddingLeft:200}}>
                            <AppBar position="static" >
                                <Toolbar>
                                    <Typography variant="h6">
                                        {/* <Link to="/" style={{textDecoration:'none',color:'white'}}> */}
                                            Daily Bet
                                        {/* </Link> */}
                                    </Typography>
                                    <div style={{margin:'10 10 10 auto'}}>
                                        <div style={this.color}>{this.state.user.email}</div>                           
                                    </div>   
                                        <div style={{marginLeft:'10px'}}>
                                            <Link to="/" onClick={this.logout} style={{textDecoration:'none'}}>
                                                <Button  variant="contained" style={{backgroundColor:'royalblue',color:'white'}} >
                                                Logout
                                                </Button>  
                                            </Link>   
                                        </div>                                 
                                </Toolbar>
                        </AppBar>
                    </div>
                ):( 
                    <div >
                    <AppBar position="static" style={{backgroundColor:'white'}}>
                            <Toolbar>
                                <Typography variant="h6">
                                    <Link to="/" style={{textDecoration:'none'}}>
                                        Daily Bet
                                    </Link>
                                </Typography>
                                <div style={{margin:'0 0 0 auto'}}>
                                    <Link to="/login" onClick={this.login} style={{textDecoration:'none'}}>
                                        <Button  color="primary"  variant="outlined">
                                        Login
                                        </Button>
                                    </Link>
                                </div>                                
                            </Toolbar>
                        </AppBar>
                    </div>
                        

                    
                )}

        </div>

    )
    }
}

NavBar = connect((state)=>state)(NavBar);

//react-routerでページ遷移の基本はLinkだが、onClickなどのhandleでは使えない
//handleで呼び出すには、withRouter(XxxYyyy)とthis.props.history.push(/zzzz)を使う

export default withRouter(NavBar);