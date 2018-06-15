
//ADD_AUTH
export const  addAuth=({
    username,
    isLoggedIn
} = {})=>({
    type:"ADD_AUTH",
    authentication:{
        username,
        isLoggedIn
    }
});

// REMOVE_AUTH
export const removeAuth = ({
    username
} = {}) => ({
    type:"REMOVE_AUTH",
    username
});