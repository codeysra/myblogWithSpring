import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAuth, removeAuth} from './../../actions/authentication';
class Login extends React.Component{
    state={
        username:"",
        password:""
       
    };
    componentDidMount(){
         
       if(this.props.authentication.length>0){
            this.props.history.push('/admin');
        }
        
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const data='username='+this.state.username+'&password='+this.state.password;
       
        axios({
            method:'post',
            url: process.env.URL.concat('/rest-api/login'),
            data:data,
            withCredentials: true,
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            // console.log(response.headers["authorization"]);
             this.props.dispatch(addAuth({
                username: this.state.username,
                jwt:response.headers["authorization"]
            }));

          this.props.history.push('/admin');

           
        })
        .catch(error => {
            console.log(error.response);
            if(error.response.status===401)
                document.getElementById("error").innerHTML="Error! Invalid Credentials.";
            else if(error.response.status===403)
                document.getElementById("error").innerHTML="Error! Invalid token.";

         });
         
            
       
    }
  
    render(){
        return(
            <div>
                <h1>Login</h1>
                <div id="error"></div>
                <form id="create-course-form" >
                    <input type="text" placeholder="Your username" value={this.state.username}   name="username" onChange={e=>this.setState({username:e.target.value})} />
                    <input type="password" placeholder="Your password" value={this.state.password}   name="password" onChange={e=>this.setState({password:e.target.value})}/>
                    <button type="submit" 
                    onClick={(e)=>this.handleSubmit(e)}
                    >Login </button>
                </form>

            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(Login);
   