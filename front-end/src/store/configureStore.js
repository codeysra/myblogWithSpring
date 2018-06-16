import {createStore, combineReducers} from 'redux';
import authReducer from './../reducers/authentication';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

export default () => {

    const persistConfig = {
        key: 'root',
        storage,
     };
    const persistedReducer = persistReducer(
        persistConfig, 
        combineReducers({
            authentication: authReducer
         })
    );


    const store = createStore(
        persistedReducer
    );
    
    return store;
};