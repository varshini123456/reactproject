const initialState = {
    username: ""
}

//Reducer for exporting the user name as state after Login
const userReducer =(state=initialState,action)=>{
    switch (action.type){
        case "loginUser":
            console.log(action.payload.username)
            return{
                ...state,
                username: action.payload.username,
                userId: action.payload.userId
            }
        case "logout":
            return{
                ...state,
                username: ""
            }
        default: return state
    }
}

export default userReducer