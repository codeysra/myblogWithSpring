import React from 'React';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import AdminRouter from './AdminRouter';
import Blog from './../components/blog/Blog';
import Post from './../components/blog/Post';
import Login from './../components/authentication/Login';
import Logout from './../components/authentication/Logout';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';

const PrivateRoute = ({auth})=>{
   
    return <Route 
        render={() => Array.from(auth).length > 0 ? <AdminRouter/> 
        : <Redirect to={{pathname: '/login'}} />}
    />
}

const HandleLogout = ({auth}) => {
    return <Route 
        render={() => Array.from(auth).length > 0 ? <Logout/> 
        : <Redirect to={{pathname: '/login'}} />}
    />
}




const AppRouter = (props)=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Blog} exact={true}/>
                <Route path="/post/:id" component={Post} />
                <Route path="/login" component={Login}/>
                <HandleLogout path="/logout" auth={props.authentication} />
                <PrivateRoute path="/admin" auth={props.authentication} />
                
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};
//<Route path="/admin" component={AdminRouter} />
const mapStateToProps = (state)=>{
    return{
        authentication:state.authentication,
    }
};

export default connect(mapStateToProps)(AppRouter);

