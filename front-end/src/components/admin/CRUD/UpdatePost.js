import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAuth, removeAuth} from './../../../actions/authentication';
import {NavLink} from 'react-router-dom';

class UpdatePost extends Component{
    state={
        post:{
            id:0,
            title:"",
            smallDesc:"",
            content:"",
            status:false,
            category:"",
            publishedOn:"",
            img:""
        }
    }
    componentDidMount(){
        this.setState(()=>({id:this.props.match.params.id}))
        axios({
            method:'get',
            url:`http://localhost:8080/myblog/admin/post/${this.props.match.params.id}`,
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             this.setState(()=>({post:response.data}));
              console.log(this.state.post);
         })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             document.getElementById("msg").textContent="An error occured while GET category";
         });
    }

    render(){
        return (
            <div className="container">
               <div>
                    <h1>Update Post {this.state.id}</h1>


                    
                </div>
                

            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication
    }
};

export default connect(mapStateToProps)(UpdatePost);