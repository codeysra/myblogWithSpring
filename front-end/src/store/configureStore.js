import {createStore, combineReducers} from 'redux';
import authReducer from './../reducers/authentication';


export default () => {
    const store = createStore(
        combineReducers({
            authentication: authReducer
         })
       );
      return store;
};