import React from 'React';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminDashboard from './../components/admin/AdminDashboard.js';
import Blog from './../components/blog/Blog';
import NotFoundPage from './../components/NotFoundPage';


const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Blog} exact={true}/>
            <Route path="/admin" component={AdminDashboard}   />
            <Route component={NotFoundPage}/>
         </Switch>
    </BrowserRouter>
);

export default AppRouter;