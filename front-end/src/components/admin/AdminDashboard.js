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
 
        
        // axios.post('http://localhost:8080/myblog/login',payload)
        // .then(function(response){
        //     console.log(response);
        // }).catch(error => {
            
        //     console.log(error.response);
        // });
       
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/admin/post/',
            
        })
        .then(response=>{
            console.log(response);
        }).catch(error => {
            
            console.log(error.response.headers['x-csrf-token']);
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