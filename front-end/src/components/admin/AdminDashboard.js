import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


class AdminDashboard extends Component{
    state={
         posts:{}
    };

    componentDidMount(){
        
        if(this.props.authentication.length==0){
            this.props.higherProps.history.push('/login');
        }else{
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
        
    }

    

    render(){
        
       
        return (
            <div className="container">
                <NavLink to="/admin/post/add" className="btn btn-outline-primary" exact={true}>Add New Post</NavLink>
               
                <div id="posts-area">
               
                {
                    
                    Array.from(this.state.posts).map((post)=>{

                        return  <div key={post.id} className="card">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p className="card-text">{post.smallDesc}</p>
                                    <NavLink to="/admin/post?id" exact={true}>Read>></NavLink>

                                </div>
                    })
                }
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