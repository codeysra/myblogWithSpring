import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminRouter from './AdminRouter';
import Blog from './../components/blog/Blog';
import Post from './../components/blog/Post';
import Login from './../components/authentication/Login';
import NotFoundPage from './../components/NotFoundPage';
import {connect} from 'react-redux';



const AppRouter = (props)=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Blog} exact={true}/>
                <Route path="/post/:id" component={Post} />
                <Route path="/admin" component={AdminRouter} />
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