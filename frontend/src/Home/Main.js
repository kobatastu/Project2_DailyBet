import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SideBar from './SideBar'
import Mybet from './Mybet'
import MainHome from './MainHome'
import Board from './Board'
import Buycoin from './Buycoin'
import CircularIndeterminate from './CircularIndeterminate'





class Main extends Component {
    constructor(props){
        super(props);


    }





    render(){
        
        return(
            <div>
                {this.props.myemail==='' ? 
                <div style={{textAlign:'center',verticalAlign:'center'}}>
                    <CircularIndeterminate/>
                    <p style={{fontSize:'40px',fontWeight:'bold'}}>Loading...</p>
                </div>
                
                :
                
                <div className="container">
                    
                    <div className="row">
                    
                
                        <SideBar />
                
                        <div style={{paddingLeft:200}} >
                            <AppBar position="static" color="default" >
                                <Tabs
                                    value={false}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                >
        
                                    <Tab label='HOME' to='/login' component={Link}/>
                                    <Tab label='MY BET' to= '/login/mybet' component={Link} />
                                    <Tab label='BOARD' to= '/login/board' component={Link} />
                                    <Tab label='BUYCOIN' to= '/login/buycoin' component={Link} />
                                </Tabs>
                            </AppBar>
                            <Route exact path="/login" component={MainHome}/>
                            <Route exact path="/login/mybet" component={Mybet}/>
                            <Route exact path="/login/board" component={Board}/>
                            <Route exact path="/login/buycoin" component={Buycoin}/>
                        
                        
                    
                        </div>
                    </div>
                </div>
                }
            </div>

        )
    }
}

Main = connect((state)=>state)(Main);

export default withRouter(Main);