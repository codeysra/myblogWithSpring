import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addAuth, removeAuth } from "./../../../actions/authentication";
import { NavLink } from "react-router-dom";

class CreatePost extends Component {
    state={
        title:"",
        smallDesc:"",
        content:"",
        status:false,
        category:"Test",
        publishedOn:"",
        img:""
    }

  componentDidMount() {
    if (this.props.authentication.length == 0) {
      this.props.higherProps.history.push("/login");
    }
  }

  createPost=(e)=>{
      e.preventDefault();
      const today=new Date();
      const  formattedDate = today.getDate()+"-"+(today.getMonth()+1) + "-" + today.getFullYear();

      this.setState({publishedOn:formattedDate},function(){
            console.log("/"+this.state.publishedOn+"/");
            const data={
                title:this.state.title,
                smallDesc:this.state.smallDesc,
                content:this.state.content,
                status:false,
                category:this.state.category,
                publishedOn:this.state.publishedOn,
                img:"",
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
                this.setState(()=>({posts:response.data}));
                
            })
            .catch(error => {
                console.log("An error occured: "+error);
                console.log(error.response);
                
            });
      });
      
      
      
  }
  render() {
    return (
      <div className="container" id="create-post">
        <h1>Create Post (Add New Post)</h1>

        <form>
          <div className="form-group" >
                <label>Title</label>
                <input type="text" className="form-control" value={this.state.title} onChange={e=>this.setState(({title:e.target.value}))}/>
          </div>
          <div className="form-group" >
                <label>Small Desc</label>
                <input type="text" className="form-control" value={this.state.smallDesc} onChange={e=>this.setState({smallDesc:e.target.value})}/>
          </div>
          <div className="form-group" >
                <label>Content</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                value={this.state.content} onChange={e=>this.setState({content:e.target.value})}>
                </textarea>
          </div>
          
          <div className="form-group">
            <label >Category</label>
            <select className="form-control" onChange={e=>this.setState({category:e.target.value})}  value={this.state.category}>
                <option value="Test">Test</option>
                <option value="Spring">Spring</option>
                <option value="Java">Java</option>
                 
            </select>
        </div>
          <button className="btn btn-outline-success" onClick={(e)=>this.createPost(e)}>Add Post</button>
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
