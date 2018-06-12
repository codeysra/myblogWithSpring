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
        // var xhr = new XMLHttpRequest();
        // xhr.open("get","http://localhost:8080/myblog/admin/post/",true);
        // xhr.setRequestHeader("X-CSRF-Token" , "Fetch");
        // xhr.onreadystatechange = function () {
        //     console.log(xhr.getResponseHeader("X-CSRF-TOKEN"));
        // }
        // xhr.send(null);
        
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
            
            console.log(error.response);
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