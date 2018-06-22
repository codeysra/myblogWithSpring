import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateCategory extends Component{

    state={
        name:"",
        description:""
    }

    componentDidMount() {
        if (this.props.authentication.length == 0) {
          this.props.higherProps.history.push("/login");
        }
        
    }

    createCategory = (e)=>{
        e.preventDefault();
        console.log(this.state);
        console.log(this.state.name.trim().length);
        if(this.state.name.trim().length===0 || this.state.description.trim().length===0){
            document.getElementById("msg").textContent="Please fill all the inputs.";
            document.getElementById("msg").classList.add("alert-danger");
            document.getElementById("msg").classList.add("alert-success");
        }else{

            axios({
                method:'post',
                url:'http://localhost:8080/myblog/admin/category/',
                data:this.state,
                headers: {
                    Authorization:this.props.authentication[0]["jwt"]
                }
            })
            .then(response=>{
                 document.querySelector("#msg").classList.add("alert-success");
                 document.querySelector("#msg").classList.remove("alert-danger");
                 document.querySelector("#msg").innerHTML="Your category was created!";
                
            })
            .catch(error => {
                 console.log(error.response);
                 document.querySelector("#msg").classList.add("alert-danger");
                 document.querySelector("#msg").classList.remove("alert-success");
                 document.querySelector("#msg").innerHTML="An error occurred! Unable to create your category.";
            });   
        }
    }
    render(){
        return (
            <div className="container">
                <h1>Create Category (Add New Category)</h1>
                <Link to="/admin/category" className="btn btn-outline-primary mt-3">Back to Category Management</Link>
                
                <div id="msg" className="alert mt-4"></div>
                
                <form className="my-5">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter category name" value={this.state.name}
                            onChange={e=>{this.setState({name:e.target.value})}}/>
                    </div>
                
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3"  value={this.state.description}
                            onChange={e=>{this.setState({description:e.target.value})}}></textarea>
                    </div>
                     <button className="btn btn-success mt-3" onClick={this.createCategory}>Create</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      authentication: state.authentication
    };
  };
  
export default connect(mapStateToProps)(CreateCategory);