import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

// function mappingState(state){
//     return state;
// }


class Mycoin extends Component {

    render(){
        return(
            <div>
                <b style={{fontSize:'25px'}}>{this.props.mycoin}</b>コイン  
            </div>
        )
    }
}

Mycoin = connect((state)=>state)(Mycoin);

export default withRouter(Mycoin);