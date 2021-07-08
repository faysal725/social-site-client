import { ADD_POST, ADD_USER, REMOVE_USER } from '../Action/LoginAction';


const initialState ={
    loggedUser: [
        {user: "none", isLoggedIn: false}
    ],
    defaultUser:[
        {user: "none"}
    ],
    userPost: []
}

const LoginReducer = (state = initialState, action) => {


    switch(action.type){
        case ADD_USER:
            console.log(action)
            const newUser = [{
                user: action.user,
                isLoggedIn: true
            }]
            // console.log(newUser)
            console.log(state)
            return {...state, loggedUser:newUser}


            case REMOVE_USER:
            console.log(action)
            const removeUser = [{user: "none", isLoggedIn: false}];
            console.log(removeUser)
            // const goneUser=[...state.loggedUser, removeUser]
            return {...state, loggedUser:removeUser}

            case ADD_POST:
            console.log(action)
            const newPost = {
                user: action.user,
                post: action.post,
                postId: Math.round(Math.random()*100)+1
            }
            console.log(newPost)
            console.log(state)
            const enterPost = [...state.userPost, newPost]
            console.log(enterPost)
            return{...state, userPost:enterPost}



        default:
            return state;
    }
    
    
};

export default LoginReducer;