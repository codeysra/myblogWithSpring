import React,{Component} from 'react';
import {connect} from 'react-redux';
import { removeAuth} from './../../actions/authentication';
import {Redirect} from 'react-router-dom';

class Logout extends Component{


    render(){
        const username = this.props.authentication[0]["username"];
         this.props.dispatch(removeAuth({username:username}));
        return (
            <Redirect to={{pathname: '/login'}} />
 
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(Logout);