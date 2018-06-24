import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import img from '../../../img/index';

class AdminDashboard extends Component{
    state={
         posts:{}
    };

    componentDidMount(){
  
        this.retrieveAllPosts();
    }
    
    retrieveAllPosts = ()=>{
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/admin/post/',
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             this.setState(()=>({posts:response.data}));
             
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }

    deletePost = (event,{id}={})=>{
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    event.preventDefault();
                    const url=`http://localhost:8080/myblog/admin/post/${id}`;
                    axios({
                        method:'delete',
                        url:url,
                        
                        headers: {
                            Authorization:this.props.authentication[0]["jwt"]
                        }
                    })
                    .then(response=>{
                        this.retrieveAllPosts();
                        this.displayPosts();
                    })
                    .catch(error => {
                        console.log("An error occured: "+error);
                        console.log(error.response);
                        
                    });
                 }
              },
              {
                label: 'No',
                onClick: () => {return;}
              }
            ]
          })
       
        
         
    };
    
    publishPost = (e) => {
        confirmAlert({
          title: 'Confirm to publish',
          message: 'Are you sure to do this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                  e.preventDefault();
                  
               }
            },
            {
              label: 'No',
              onClick: () => {return;}
            }
          ]
        })
      };
    render(){
        
      return  this.displayPosts()
        
    };

    displayPosts =()=>{
        console.log(this.state.posts[0]);
        return (
            <div className="container">
                <h1 className="mb-5">Admin Dashboard (Homepage)</h1>
                <Link to="/admin/post/create" className="btn btn-outline-primary">Add New Post</Link>
                <Link to="/admin/category" className="btn btn-primary float-right">Manage Categories</Link>
                <div id="posts-area">
               
                {
                    
                    Array.from(this.state.posts).map((post)=>{

                        return  <div key={post.id} className="card">
                                    <h2 className="card-title">{post.title}</h2>

                                    <span>Category: {post.category.name}</span>
                                    <p className="card-text">{post.smallDesc}</p>
                                    
                                    <div  dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                   
                                    <Link to={`/admin/post/update/${post.id}`} >Update>></Link>
                                    <button className="btn btn-danger" id="delete-btn" onClick={(event)=>this.deletePost(event,post)}>Delete</button>
                                    
                                    <div className="my-3">Status: {
                                        post.status===true?
                                           <span> Published </span>
                                        :
                                            <span>Not Published 
                                            <button className="ml-5 btn btn-outline-success"
                                                onClick={this.publishPost}
                                            >Publish</button> </span>
                                        }
                                        
                                    </div>
                                     
                                </div>
                    })
                }
                </div>


                

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AdminDashboard);