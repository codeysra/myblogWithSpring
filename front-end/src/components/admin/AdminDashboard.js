import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import img from '../../../img/index';

class AdminDashboard extends Component{
    state={
         posts:{}
    };

    componentDidMount(){
        
        if(this.props.authentication.length==0){
            this.props.higherProps.history.push('/login');
        }else{
             this.retrieveAllPosts();
        }
        
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
    

    render(){
        
      return  this.displayPosts()
        
    };

    displayPosts =()=>{
        return (
            <div className="container">
                <Link to="/admin/post/create" className="btn btn-outline-primary">Add New Post</Link>
                <Link to="/admin/category" className="btn btn-primary float-right">Manage Categories</Link>
                <div id="posts-area">
               
                {
                    
                    Array.from(this.state.posts).map((post)=>{

                        return  <div key={post.id} className="card">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p className="card-text">{post.smallDesc}</p>
                                    
                                    <div  dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                   
                                    <Link to={`/admin/post/update/${post.id}`} >Update>></Link>
                                    <button className="btn btn-danger" id="delete-btn" onClick={(event)=>this.deletePost(event,post)}>Delete</button>
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