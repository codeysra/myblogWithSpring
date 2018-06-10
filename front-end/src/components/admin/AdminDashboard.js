import React,{Component} from 'react';
import axios from 'axios';

export default class AdminDashboard extends Component{
    state={
        username:undefined
    };
    handleClick=()=>{
        const payload = {
            "username":"admin",
            "password":"admin"
        };
        axios.post('http://localhost:8080/login',payload).
        then(function(response){
            console.log(response);
        });
    };
    render(){
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    };
}