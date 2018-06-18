import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


class AdminDashboard extends Component{
    state={
         posts:{}
    };

    componentDidMount(){
        console.log("*****");
        console.log(this.props.authentication[0]["jwt"]);
        if(this.props.authentication.length===0){
            this.props.history.push('/login');
        }
        axios({
            method:'get',
            url:'http://localhost:8080/myblog/admin/post/',
            
            headers: {
                Authorization:this.props.authentication[0]["jwt"]
            }
        })
        .then(response=>{
             
            this.setState(()=>({posts:response.data}));
console.log(this.state.posts);
           const ar=[{name:"a"},{name:"b"}];
           this.state.posts.forEach(el=>{
               <div>Hoo</div>
           })
            
        })
        .catch(error => {
            console.log("An error occured: "+error);
            console.log(error.response);
             
         });
    }

    

    render(){
        return (
            <div className="container">
                <NavLink to="/admin/post/add" className="btn btn-outline-primary" exact={true}>Add New Post</NavLink>
               
                <div id="posts-area">
                    {console.log(this.state.posts.length)}
                
                </div>


                

            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AdminDashboard);