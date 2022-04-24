const initialState = {
    sellername: "",
    sellerId:""
}

//Reducer for exporting the seller name as state after Login
const sellerReducer =(state=initialState,action)=>{
    switch (action.type){
        case "loginSeller":
            console.log(action.payload.sellername)
            console.log(action.payload.sellerId)
            return{
                ...state,
                sellername: action.payload.sellername,
                sellerId:action.payload.sellerId
            }

            case "Logout":
                return{
                    ...state,
                   sellername: ""
                }
        default: return state
    }
}

export default sellerReducer