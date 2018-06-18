import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminDashboard from './../components/admin/AdminDashboard.js';
import AddPost from '../components/admin/CRUD/AddPost';
import UpdatePost from '../components/admin/CRUD/UpdatePost';
import Header from './../components/admin/Header';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';
import Login from './../components/authentication/Login'

const AdminRouter = (props)=>{
    // console.log(props.authentication.length==0);
    // console.log("props.authentication.length");
    return (
        <BrowserRouter>
            <div>
                <Header higherProps={props}/>
                <Switch>
                    <Route path="/admin"  render={()=><AdminDashboard higherProps={props}/>}  exact={true}/>
                    <Route path="/admin/post/:id" component={UpdatePost}  />
                    <Route path="/admin/post/add" render={()=><AddPost higherProps={props}/>}/>
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

 