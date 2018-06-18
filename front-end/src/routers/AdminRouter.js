import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminDashboard from './../components/admin/AdminDashboard.js';
import AddPost from './../components/admin/AddPost';
import Header from './../components/admin/Header';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';



const AdminRouter = (props)=>{
    return (
        <BrowserRouter>
            <div>
                <Header higherProps={props}/>
                <Switch>
                    <Route path="/admin" component={AdminDashboard} exact={true}/>
                    <Route path="/admin/post/add" component={AddPost}/>
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

 