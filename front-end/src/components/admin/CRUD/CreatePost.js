import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


class CreatePost extends Component {
   

  state={
    model: '',
    title:"",
    smallDesc:"",
    content:"",
    status:false,
    category:"Test",
    publishedOn:"",
    img:""
  }
  handleModelChange= (model) =>{
    this.setState({
      model: model
    });
    console.log(this.state.model);
  }
  componentDidMount() {
    
  }

  createPost=(e)=>{
      e.preventDefault();
      const today=new Date();
      const  formattedDate = today.getDate()+"-"+(today.getMonth()+1) + "-" + today.getFullYear();

      this.setState({publishedOn:formattedDate},function(){
          
            const data={
                title:this.state.title,
                smallDesc:this.state.smallDesc,
                content:this.state.model,
                status:false,
                category:this.state.category,
                publishedOn:this.state.publishedOn,
                img:this.state.img,
                "user": {
                    "username": "admin"
                }
            };
            axios({
                method:'post',
                url:'http://localhost:8080/myblog/admin/post/',
                data:data,
                headers: {
                    Authorization:this.props.authentication[0]["jwt"]
                }
            })
            .then(response=>{
                 document.querySelector("#msg").classList.add("alert-success");
                 document.querySelector("#msg").classList.remove("alert-danger");
                 document.querySelector("#msg").innerHTML="Your post was created!";
                
            })
            .catch(error => {
                 console.log(error.response);
                 document.querySelector("#msg").classList.add("alert-danger");
                 document.querySelector("#msg").classList.remove("alert-success");
                 document.querySelector("#msg").innerHTML="An error occurred! Unable to create your post.";
            });
      });
      
  }
 //onChange = (editorState) => this.setState({editorState});

  render() {
   
     return (
      <div className="container" id="create-post">
        <h1>Create Post (Add New Post)</h1>
         
        <div id="msg" className="alert"></div>
        <form id="formm">
          <div className="form-group" >
                <label>Title</label>
                <input type="text" className="form-control" value={this.state.title} onChange={e=>this.setState(({title:e.target.value}))}/>
          </div>
          <div className="form-group" >
                <label>Small Desc</label>
                <textarea className="form-control" rows="3" value={this.state.smallDesc} onChange={e=>this.setState({smallDesc:e.target.value})}></textarea>
          </div>
          <div className="form-group" >
            <label>img</label>
            <input type="text" className="form-control" value={this.state.img} onChange={e=>this.setState({img:e.target.value})}/>
          </div>    
          <div className="form-group">
            <label >Category</label>
            <select className="form-control" onChange={e=>this.setState({category:e.target.value})}  value={this.state.category}>
                <option value="Test">Test</option>
                <option value="Spring">Spring</option>
                <option value="Java">Java</option>
                 
            </select>
          </div>
          <label>Content</label>
          <FroalaEditor tag='textarea' model={this.state.model}
          onModelChange={this.handleModelChange}/>
        
           <button className="btn btn-outline-success my-5" onClick={(e)=>this.createPost(e)}>Add Post</button>
           
        </form>
       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

export default connect(mapStateToProps)(CreatePost);
