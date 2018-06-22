import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminDashboard from './../components/admin/AdminDashboard.js';
import CreatePost from '../components/admin/CRUD/CreatePost';
import UpdatePost from '../components/admin/CRUD/UpdatePost';
import Header from './../components/admin/Header';
import CategoryDashboard from './../components/admin/category/CategoryDashboard';
import CreateCategory from './../components/admin/category/CRUD/CreateCategory';
import UpdateCategory from './../components/admin/category/CRUD/UpdateCategory';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';
import Logout from '../components/authentication/Logout'
const AdminRouter = (props)=>{
  
    return (
        <BrowserRouter>
            <div>
                <Header higherProps={props}/>
                <Switch>
                    <Route path="/admin"  render={()=><AdminDashboard higherProps={props}/>}  exact={true}/>
                    <Route path="/admin/category"  render={()=><CategoryDashboard higherProps={props}/>}  exact={true}/>
                    <Route path="/admin/category/create"  render={()=><CreateCategory higherProps={props}/>} />
                    <Route path="/admin/category/update/:id" component={UpdateCategory }   />
                    <Route path="/admin/post/create" render={()=><CreatePost higherProps={props}/>} />
                    <Route path="/admin/post/update/:id"  render={()=><UpdatePost higherProps={props}/>} />
                    <Route path="/logout" render={()=><Logout/>}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>    
        </BrowserRouter>
    );
};

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AdminRouter);

 