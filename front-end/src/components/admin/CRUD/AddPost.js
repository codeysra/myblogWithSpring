import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAuth, removeAuth} from './../../../actions/authentication';
import {NavLink} from 'react-router-dom';

class AddPost extends Component{

    componentDidMount(){
         
        if(this.props.authentication.length==0){
            this.props.higherProps.history.push('/login');
        } 
        
    }

    render(){
        return (
            <div className="container">
               
                
                <div>
                    <h1>Add New Post</h1>
                    
                </div>
                

            </div>
        );
    };
}

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication
    }
};

export default connect(mapStateToProps)(AddPost);