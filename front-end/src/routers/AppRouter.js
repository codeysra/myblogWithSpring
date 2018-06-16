import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminDashboard from './../components/admin/AdminDashboard.js';
import Blog from './../components/blog/Blog';
import Login from './../components/authentication/Login';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';

const isAuth =(props)=>{
    console.log(props);
    if(props.authentication.length>0)
        return <AdminDashboard/>
    else
        return <login/>
};

const AppRouter = (props)=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Blog} exact={true}/>
                <Route path="/admin" component={AdminDashboard} 
                
                />
                <Route path="/login" component={Login}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AppRouter);

//export default AppRouter;