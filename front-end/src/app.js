import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addAuth} from './actions/authentication';


// Configuring the store
const store = configureStore();

store.dispatch(addAuth({
    username:'admin',
    isLoggedIn:'yes'
}));


console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById("app")
);

 