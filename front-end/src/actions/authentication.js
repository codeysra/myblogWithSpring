
//ADD_AUTH
export const  addAuth=({
    username,
    jwt
} = {})=>({
    type:"ADD_AUTH",
    authentication:{
        username,
        jwt
    }
});

// REMOVE_AUTH
export const removeAuth = ({
    username
} = {}) => ({
    type:"REMOVE_AUTH",
    username
});