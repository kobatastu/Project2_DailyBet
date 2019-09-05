import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import Timer from './Timer'
import CircularIndeterminate from './CircularIndeterminate'





class MainHome extends Component {
    constructor(props){
        super(props);

        this.state={
            bets:null,
        }
    }

    async componentDidMount(){
        const bets = (await axios.get('http://localhost:8080/')).data;
        this.setState({
            bets,
        })
    }



    render(){
        
        return(
            <div >

                    
                    {
                        this.state.bets === null && 
                        <div style={{textAlign:'center',verticalAlign:'center'}}>
                            <CircularIndeterminate/>
                            <p style={{fontSize:'40px',fontWeight:'bold'}}>Loading...</p>
                        </div>
                    }

                    {
                        this.state.bets && this.state.bets.map(bet => (
                            <div key={bet.id}>
                                <Card style={{maxWidth:500,margin:'50px auto',backgroundColor:'white'}}>
                                   
                                        <CardMedia
                                        component='img'
                                        src={`${process.env.PUBLIC_URL}/`+bet.picname}
                                        style={{height:'140'}}/>
                                        
                                    <CardContent>
                                        <Typography>
                                            ジャンル : {bet.genre}
                                        </Typography>
                                        <Typography variant="h5" component="h2" style={{margin:'10px 0 20px 0'}}>
                                            {bet.title}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {bet.contents}
                                        </Typography>
                                        <div>
                                           
                                            <Timer 
                                                Aname={bet.Aname}
                                                Bname={bet.Bname}
                                                Atotal={bet.Atotal} 
                                                Btotal={bet.Btotal} 
                                                id={bet.id} 
                                                time={bet.time}
                                                status={bet.status}
                                            />

                                        </div>

                                       
                                    
                                    </CardContent>
                                   
                                </Card>
                            </div>
                        ))
                        
                    }
                
                
            </div>

        )
    }
}

MainHome = connect()(MainHome);

export default MainHome;