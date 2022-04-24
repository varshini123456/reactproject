import { combineReducers } from "redux";
import sellerReducer from "./sellerReducer"
import categoryReducer from "./categoryReducer"
import brandReducer from "./brandReducer"
import userReducer from "../../user/reducers/userReducer";
import cartReducer from "../../user/reducers/cartReducer"
//root reducer which combines all reducers 
const sellerrootReducer = combineReducers({brandReducer: brandReducer,categoryReducer: categoryReducer,sellerReducer: sellerReducer, userReducer: userReducer, cartReducer: cartReducer})

export default sellerrootReducer