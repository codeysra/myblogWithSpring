
// Authentication Reducer
const defaultStateAuthenticationReducer = [];

export default (state = defaultStateAuthenticationReducer,action) => {

    switch(action.type){
        case "ADD_AUTH":
            return [...state,action.authentication];
        case "REMOVE_AUTH":
            return state.filter(({username}) => {
                return username != action.username;
            });
         default:
            return state;   
    }

};