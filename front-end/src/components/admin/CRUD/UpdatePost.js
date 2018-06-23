import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


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
        },
        model:"",
        categories:[]
    }
    componentDidMount(){
        this.setState(()=>({id:this.props.match.params.id}))
        this.getAllPosts();
        this.getAllCategories();   
    }
    handleModelChange= (model) =>{
        this.setState({
          model: model
        });
    }
    render(){
        return (
            <div className="container">
               <div>
                    <h1>Update Post {this.state.id}</h1>
                    <div className="alert my-5" id="msg"></div>
                    <form className="mb-5">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={this.state.post.title} className="form-control"
                                onChange={e=> this.setState({post:{...this.state.post,title:e.target.value}})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Small Desc</label>
                            <textarea type="text" value={this.state.post.smallDesc} rows="3" className="form-control"
                                onChange={e=> this.setState({post:{...this.state.post,smallDesc:e.target.value}})}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>img</label>
                            <input type="text" value={this.state.post.img} className="form-control"
                                onChange={e=> this.setState({post:{...this.state.post,img:e.target.value}})}
                            />
                        </div>
                        <div className="form-group my-5">
                            <label >Category</label>
                            <select className="form-control" 
                            onChange={e=>this.setState({post:{...this.state.post,category:e.target.value}})}  value={this.state.category}>
                                {this.state.categories.map((category) =>{
                                    return (<option key={category.id} value={category.name}>{`${category.name}`}</option>)
                                })}
                            </select>
                        </div>
                        <label>Content</label>
                        <FroalaEditor tag='textarea' model={this.state.model}
                            onModelChange={this.handleModelChange}/>
        
                        <button className="btn btn-outline-success my-5" onClick={(e)=>this.updatePost(e)}>Update Post</button>
                    </form>


                    
                </div>
                

            </div>
        );
    };
    updatePost = (e)=>{
        e.preventDefault();
        const chosenCategory = (this.state.categories.filter((category)=>{
            return category.name == this.state.post.category;
          }))[0];
        this.setState({post:{...this.state.post,content:this.state.model,category:chosenCategory}},function(){
            axios({
                method:'put',
                url:`http://localhost:8080/myblog/admin/post/${this.props.match.params.id}`,
                data:this.state.post,
                headers: {
                    Authorization:this.props.authentication[0]["jwt"]
                }
            })
            .then(response=>{
                document.getElementById("msg").classList.add('alert-success');
                document.getElementById("msg").classList.remove('alert-danger');
                document.getElementById("msg").textContent="Post updated!";
                  
             })
            .catch(error => {
                console.log("An error occured: "+error);
                console.log(error.response);
                document.getElementById("msg").classList.add('alert-danger');
                document.getElementById("msg").classList.remove('alert-success');
                document.getElementById("msg").textContent="An error occurred while updating the post.";
             });
        });



    }
    getAllPosts = ()=>{
        axios({
            method:'get',
            url:`http://localhost:8080/myblog/admin/post/${this.props.match.params.id}`,
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             this.setState(()=>({post:response.data}));
             this.setState(()=>({model:this.state.post.content}));
            
         })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             document.getElementById("msg").textContent="An error occured while GET category";
         });
    }
    getAllCategories = () =>{
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/admin/category/',
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
          })
          .then(response=>{
              this.setState({categories:response.data});
                console.log(this.state.categories);
          })
          .catch(error => {
              console.log("An error occured: "+error);
              console.log(error.response);
              document.querySelector("#msg").classList.add("alert-danger");
              document.querySelector("#msg").classList.remove("alert-success");
              document.querySelector("#msg").innerHTML="An error occurred! Unable to GET the categories.";
          });
    }
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication
    }
};

export default connect(mapStateToProps)(UpdatePost);

