import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import axios from 'axios'


class UpdateCategory extends Component{
    state={
        category:{
            id:0,
            name:"",
            description:""
        }
    }
    componentDidMount() {
        axios({
            method:'get',
            url:process.env.URL.concat(`/rest-api/admin/category/${this.props.match.params.id}`),
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             this.setState(()=>({category:response.data}));
              
         })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             document.getElementById("msg").textContent="An error occured while GET category";
         });
    }

    updateCategory = (e)=>{
        e.preventDefault();
        axios({
            method:'put',
            url:process.env.URL.concat(`/rest-api/admin/category/${this.props.match.params.id}`),
            data:this.state.category,
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
            document.getElementById("msg").classList.add('alert-success');
            document.getElementById("msg").classList.remove('alert-danger');
            document.getElementById("msg").textContent="Category updated!";
              
         })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
            document.getElementById("msg").classList.add('alert-danger');
            document.getElementById("msg").classList.remove('alert-success');
            document.getElementById("msg").textContent="An error occurred while updating the category.";
         });
    }

    render(){
        return  (
            <div className="container">
                <h1>Update Category</h1>

                <Link to="/admin/category" className="btn btn-outline-primary mt-3">Back to Category Management</Link>

                <div className="alert my-3" id="msg"></div>

                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.category.name} 
                            onChange={e=>this.setState({category:{...this.state.category,name:e.target.value}})}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.category.description} onChange={e=>{this.setState({
                            category:{...this.state.category, description:e.target.value}
                        })}}/>
                    </div>
                    <button className="btn btn-outline-success" onClick={this.updateCategory}>Update</button>
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
  
export default connect(mapStateToProps)(UpdateCategory);