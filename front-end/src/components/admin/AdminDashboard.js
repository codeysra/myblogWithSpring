import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAuth, removeAuth} from './../../actions/authentication';

 class AdminDashboard extends Component{
    state={
         
    };

    componentDidMount(){
        console.log(this.props.authentication);
       if(this.props.authentication.length===0){
            this.props.history.push('/login');
        }
    }

    handleLogout =(e)=>{
        e.preventDefault();
        const username = this.props.authentication[0]["username"];
        this.props.dispatch(removeAuth({username:username}));
        this.props.history.push('/login');
    }

    render(){
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AdminDashboard);