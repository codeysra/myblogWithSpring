import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import "bootstrap/dist/css/bootstrap.min.css";

import "jquery/dist/jquery.min.js"; 
import "popper.js/dist/popper.min.js"; 
import "bootstrap/dist/js/bootstrap.min.js";
 

import 'normalize.css/normalize.css'; 
import "./styles/styles.scss";  


// Configuring the store
const store = configureStore();

let persistor = persistStore(store);




ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter/>
        </PersistGate>
    </Provider>,
    document.getElementById("app")
);

 