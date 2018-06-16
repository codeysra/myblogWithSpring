
//ADD_AUTH
export const  addAuth=({
    username
} = {})=>({
    type:"ADD_AUTH",
    authentication:{
        username
    }
});

// REMOVE_AUTH
export const removeAuth = ({
    username
} = {}) => ({
    type:"REMOVE_AUTH",
    username
});