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
        },
        categories:[]
    }
    componentDidMount(){
        this.setState(()=>({id:this.props.match.params.id}))
        this.getAllPosts();
        this.getAllCategories();   
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

                    </form>


                    
                </div>
                

            </div>
        );
    };
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
             console.log(this.state.post);
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

