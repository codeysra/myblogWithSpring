import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'

class CategoryDashboard extends Component{
    state={
        categories:[]
    }

    componentDidMount() {
      
       this.retrieveAllCategories();
       
        
    }
    retrieveAllCategories = ()=>{
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/admin/category/',
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             this.setState(()=>({categories:response.data}));
              
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }
    deleteCategory = (e,{id}={})=>{
        e.preventDefault();
        const url=`http://localhost:8080/myblog/admin/category/${id}`;
        console.log(id);
         axios({
            method:'delete',
            url:url,
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
            this.retrieveAllCategories();
            this.displayAllCategories();
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }
   
    render(){
        return this.displayAllCategories()
    }
    displayAllCategories = ()=>(
        <div className="container">
            <h1>Category Management</h1>

            <Link to="/admin/category/create" className="btn btn-outline-primary mt-3">Add New Category</Link>
            <div id="posts-area">
                {
                    this.state.categories.map((category)=>{
                    return  <div key={category.id} className="card">
                                <h2 className="card-title">{category.name}</h2>
                                    <p className="card-text">{category.description}</p>
                                    <Link to={`/admin/category/update/${category.id}`} >Update>></Link>
                                    <button className="btn btn-danger" id="delete-btn" onClick={(e) => this.deleteCategory( e,category)}>Delete</button>
                            </div>
                    })
                }
            </div>    
        </div>
    )

}


const mapStateToProps = state => {
    return {
      authentication: state.authentication
    };
  };
  
  export default connect(mapStateToProps)(CategoryDashboard);