import sellerstore from "../../seller/sellerstore";
import { actionTypes } from "../reducers/cartReducer";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";
import ".//cartcss.css"
import product from "./Product"

const CartProduct = ({cartpro,cart}) => {
  // Code to delete an item from cart
  const deleteFromCart = async (product) => {
    const action = {
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        item: cartpro,
      },
    };

    console.log(product.userId)
    await axios.delete(`http://localhost:5000/users/${product.userId}/cart/${product.id}`)
    
    // Deleting an item from cart in state
    sellerstore.dispatch(action);
    console.log("deleted a book in cart");
  };


  // Increment the qunatity of item
  const Increment = (product) => {
    if(product.qty < product.productquantity){
      axios.patch(`http://localhost:5000/users/${product.userId}/cart/${product.id}`,{qty: product.qty + 1})
      sellerstore.dispatch({type : "INCREMENT_QUANTITY", payload : {item : product}})
    }
    else{
      alert('No stock left to order')
    }
  }

  // Decrement the quantity of item

  const Decrement = (product) => {

    if(product.qty === 1){
      deleteFromCart(product)  // deleting item from cart if quantity is less than 1
    }

    else{
      
      axios.patch(`http://localhost:5000/users/${product.userId}/cart/${product.id}`,{qty: product.qty - 1})
      sellerstore.dispatch({type : "DECREMENT_QUANTITY", payload : {item : product}})

    }
  }

  return (
    <div>

<div className="c-box">
{/* <img image = {`http://localhost:5000/uploads/${product.Images[0].filePath}`} alt=""></img> */}
            <div className="c-content">
            <h3>Product Name - {cartpro.productname}</h3>
            <h3>Product brand - {cartpro.productbrand}</h3>
            <h4>Product Price - {cartpro.productprice}</h4>
            <h4>
            <Typography variant="h6" align="left">
                      Quantity 
                          <IconButton onClick={() => Decrement(cartpro)} color="secondary">
                            <RemoveIcon fontSize="medium" />
                          </IconButton>
                              {cartpro.qty}
                          <IconButton onClick={() => Increment(cartpro)} color="secondary">
                            <AddIcon fontSize="medium" />
                          </IconButton>
            </Typography>
            </h4>
            
              
            
            <p className="c-btn-area">
                <IconButton onClick={()=>deleteFromCart(cartpro)} color="secondary">
                    <DeleteRounded fontSize="medium" />
                  </IconButton>
            </p>
        </div>
        </div>


    </div>
  );
};



export default CartProduct;