import {createStore} from "redux";
import sellerrootReducer from "./reducers/sellerrootReducer";
//Creating seeler store for maintaining of reducers whic are in root reducer 
const sellerstore = createStore(sellerrootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default sellerstore

