import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import axios from 'axios'


class UpdateCategory extends Component{

    componentDidMount() {
      
        
        console.log(this.props);
    }

    render(){
        return (
            <div className="container">
                <h1>Update Category</h1>
                <Link to="/admin/category" className="btn btn-outline-primary mt-3">Back to Category Management</Link>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      authentication: state.authentication
    };
  };
  
export default connect(mapStateToProps)(UpdateCategory);