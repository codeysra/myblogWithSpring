import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAuth, removeAuth} from './../../../actions/authentication';
import {NavLink} from 'react-router-dom';

class UpdatePost extends Component{
    state={
        id:undefined
    }
    componentDidMount(){
          
       this.setState(()=>({id:this.props.match.params.id}))
        
    }

    render(){
        return (
            <div className="container">
               
                
                <div>
                    <h1>Update Post {this.state.id}</h1>
                    
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

export default connect(mapStateToProps)(UpdatePost);