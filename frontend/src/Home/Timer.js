import React, {Component} from 'react';


import Bets from './Bets';
import Finish from './Finish';

class Timer extends Component {

    constructor(props){
        super(props);
        this.state = {
            date:new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }



    render(){
    
        return(
            <div>
                {Date.parse(this.props.time) < Date.parse(this.state.date) ?
                    
                    <Finish 
                        Aname={this.props.Aname}
                        Bname={this.props.Bname}
                        status={this.props.status}
                        Atotal={this.props.Atotal} 
                        Btotal={this.props.Btotal} 
                    />
                :
                <div>
                    <div style={{marginTop:'20px',textAlign:'center'}}>
                    
                    ベット終了まで残り<div style={{color:'red'}}>{Math.floor((Date.parse(this.props.time)-Date.parse(this.state.date))/(24*3600000))}日{Math.floor((Date.parse(this.props.time)-Date.parse(this.state.date))%(24*3600000)/3600000)}時間{Math.floor(((Date.parse(this.props.time)-Date.parse(this.state.date))%3600000)/60000)}分{((Date.parse(this.props.time)-Date.parse(this.state.date))%60000)/1000}秒</div>
                  
                    </div>
                  
                
                    <Bets 
                        Aname={this.props.Aname} 
                        Bname={this.props.Bname} 
                        Atotal={this.props.Atotal} 
                        Btotal={this.props.Btotal} 
                        id={this.props.id} 
                    />
                </div>
                }
            </div>
        )
    }
}

export default Timer;