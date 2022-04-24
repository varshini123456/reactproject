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
import axios from "axios"

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 10px",
          marginLeft: "250px",
          marginRight: "50px",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={10} md={10} lg={10}>
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={()=>deleteFromCart(cartpro)} color="secondary">
                    <DeleteRounded fontSize="large" />
                  </IconButton>
                }
                title={"Your Product ID -  " + cartpro.pid}
              />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box
                    sx={{
                      marginLeft: "75px",
                      marginBottom: "50px",
                    }}
                  >
                    {/* <img
                      src={item.link}
                      style={{ width: 200, height: 300 }}
                      alt="bookImage"
                    /> */}
                  </Box>
                  <Box
                    sx={{
                      marginTop: "30px",
                      marginLeft: "100px",
                      marginRight: "60px",
                    }}
                  >
                    <Typography variant="h6" align="left">
                      Product Name - {cartpro.productname}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Product brand - {cartpro.productbrand}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6" align="left">
                      Product Price - {cartpro.productprice}
                    </Typography>
                    &nbsp;
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};



export default CartProduct;