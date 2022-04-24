import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import sellerstore from "../../seller/sellerstore";
import CartProduct from "./CartProduct";
import { actionTypes } from "../reducers/cartReducer";
import { ShoppingCartRounded } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";
import Header from "../UserHomepage/Header"
import {useState, useEffect} from "react"

function Cart({userId, username }) {
  const history = useNavigate();

  const [cartinfo,setCartinfo] = useState({
    cart: []
  })

  const fetchData = ()=> {
    const url=`http://localhost:5000/users/${userId}/cart`
    return fetch(url).then((response)=>response.json()).then((data)=>{
      console.log(data)
      setCartinfo({
      cart: data
    })
  })
}

const {cart} = cartinfo

const deleteFromCart= async (item)=>{
  await axios.delete(`http://localhost:5000/users/${item.userId}/cart/${item.id}`).then((res)=>{
    console.log("deleted Successfully").catch((err) => {
      console.log(err);
    });
  })
}

const deleteFromProduct= async (item)=>{
  await axios.delete(`http://localhost:5000/users/${item.userId}/sellerproduct/${item.pid}`).then((res)=>{
    console.log("product deleted Successfully").catch((err) => {
      console.log(err);
    });
  })
}

const changeQuantity = async(item) =>{
  if(item.productquantity === 1){
    deleteFromProduct(item)  // deleting item from cart if quantity is less than 1
  }

  else{
    
    axios.patch(`http://localhost:5000/users/${item.userId}/sellerproduct/${item.pid}`,{productquantity: item.productquantity - 1})

  }
}


  // Code to checkout from cart
  // Date is class which returns the current date in milliseconds. toUTCString() returns the readable string format of the date and time(GMT)
  const placeOrder = () => {
    cart.forEach((item) => {
      let order = {
        // date: new Date().toUTCString(),
        // username: item.username,
        productId: item.pid,
        return: false,
        sellername : item.sellername,
        productname: item.productname,
        productbrand: item.productbrand,
        productprice: item.productprice,
        productquantity: item.productquantity,
        cid:item.cid,
        cartQuantity : item.qty,
        userId: item.userId,
        sellerId: item.sellerId
      };
      //Hitting the url with  post method to add an order in json
      axios.post(`http://localhost:5000/users/${item.userId}/orders`, order).then((res) => {
          console.log("product" + item.id + " added to orders table");
          setTimeout(() => {
            changeQuantity(item)
            deleteFromCart(item)
            // Resetting the cart after checkout
            sellerstore.dispatch({ type: actionTypes.RESET_CART });
            console.log("Cart Reset");
            history("/user/orders");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };


  const [totalqty, setTotalQty] = useState(0)
  const [totalprice, setTotalPrice] = useState(0)

  // Calculating TotalPrice and TotalQuantity of items in cart by iterating over cart items.

  useEffect( () => {

    fetchData()
    let TotalQty = 0
    let TotalPrice = 0

    for(let c of cart){
      TotalQty += c.qty
      TotalPrice += c.qty * parseInt(c.productprice)
    }

    setTotalQty(TotalQty)
    setTotalPrice(TotalPrice)
    sellerstore.dispatch({type:"TotalQty",payload: {totalQty : TotalQty}})
  }, [cart,totalqty,totalprice])


  return (
    <div>
      <Header username={username}/>
      <div style={{ marginTop: 100 }}></div>
      <Typography variant="h3">
        <ShoppingCartRounded fontSize="large" />
        &nbsp; Cart
      </Typography>
      &nbsp;
      {cart.length === 0 ? (
        <Typography variant="h5">Cart is empty</Typography>   // If cart is empty display nothing
      ) : (
        cart.map((c) => {
          return <CartProduct cartpro= {c} />;  // If cart is not empty we iterate over cart items and display using CartProduct.
        })
      )}
      <Typography variant="h5">No.of items : {totalqty}</Typography>

      <Typography variant="h5">Total Amount : {totalprice}</Typography>

      <div style={{ marginTop: 30 }}></div>
      <Button color="secondary" variant="contained" onClick={placeOrder}>
        Check Out
      </Button>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

// Mapping username, cart from state to Component
const mapStateToProps = (state) => {
  return {
    // cart: state.cartReducer.cart,
    username: state.userReducer.username,
    userId: state.userReducer.userId,
  };
};

export default connect(mapStateToProps)(Cart);