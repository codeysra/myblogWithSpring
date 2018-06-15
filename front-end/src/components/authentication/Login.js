import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    state={
        username:"",
        password:"",
        csrf:""
    };
    componentDidMount(){
      
        
    }
    handleSubmit=(e,store)=>{
        e.preventDefault();
        const data='username='+this.state.username+'&password='+this.state.password;
       
        axios({
            method:'post',
            url:'http://localhost:8080/myblog/login',
            data:data,
            withCredentials: true,
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            document.getElementById("error").innerHTML="";
            console.log(response);
            console.log(store.getState());
            store.authentication.map(user => user.username);
        }).catch(error => {
            
           document.getElementById("error").innerHTML="Error! Invalid Credentials."
        });
        
    }
  
    render(){
        return(
            <div>
                <h1>Login</h1>
                <div id="error"></div>
                <form id="create-course-form">
                    <input type="text" placeholder="Your username" value={this.state.username}   name="username" onChange={e=>this.setState({username:e.target.value})} />
                    <input type="password" placeholder="Your password" value={this.state.password}   name="password" onChange={e=>this.setState({password:e.target.value})}/>
                    <button type="submit" 
                    onClick={e=>this.handleSubmit(e)}
                    >Login </button>
                </form>

            </div>
        );
    };
}

export default Login;