export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const ADD_POST = "ADD_POST";


export const addUser = (user)=> {
    return {type: ADD_USER, user}
}


export const removeUser=() =>{
    return {type: REMOVE_USER}
}





export const addPost = (user, post)=> {
    return {type: ADD_POST, user, post}
}
