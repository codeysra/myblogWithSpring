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
        var xhr = new XMLHttpRequest();
        xhr.open("get","http://localhost:8080/myblog/admin/post/",true);
        xhr.setRequestHeader("X-CSRF-Token" , "Fetch");
        xhr.onreadystatechange = function () {
            console.log(xhr.getResponseHeader("X-CSRF-Token"));
        }
        xhr.send(null);
        
        // axios.post('http://localhost:8080/myblog/login',payload)
        // .then(function(response){
        //     console.log(response);
        // }).catch(error => {
            
        //     console.log(error.response);
        // });
       
        // axios({
        //     method:'get',
        //     url:'http://localhost:8080/myblog/admin/post/',
            
        //     withCredentials: false
        // })
        // .then(response=>{
        //   //  console.log(response.data);
        // }).catch(error => {
        //     if(error.response.status===401){
        //        // console.log(error.response.getResponseHeader('X-CSRF-TOKEN'));
        //      }
        //     console.log(error.response);
        // });
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