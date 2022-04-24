import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SellerNavbar from "./SellerNavbar";
import SellerOrderCard from "./SellerOrderCard";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const SellerOrders = ({sellername,sellerId})=>{
    const [orderinfo,setOrderinfo] = useState({
        orders: []
    })
    // fetch the data of brands and set the data into {brand : []}
    const fetchdata = (sellerId)=>{   // To fetch orders of particular seller
       return fetch(`http://localhost:5000/sellers/${sellerId}/orders`).then((response)=>
        response.json()).then((data)=>{
            console.log(data)
            setOrderinfo({
            orders: data
        })
       
        
    })
    }
    


    useEffect(()=>{
        fetchdata(sellerId);

    },[])
    
    const {orders} = orderinfo;
    return(
        <Grid container direction="column" >
            <Grid item>
                <SellerNavbar />
            </Grid>
            <Grid item container>
            <Typography variant="h3" style={{margin:30,marginLeft:280,fontFamily:'"Kaushan Script", cursive'}}>Hi {sellername} you can see your orders in this page.</Typography>
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={2} />
                <Grid item xs={12} sm={8}>
                    
                <Grid container spacing={2}>
                {orders.map((p) => {     // Iterating over orders fetched
                    return (
                        <Grid item xs={12} sm={4}>
                        <SellerOrderCard product= {p} />
                        </Grid>
                    )
                })}
        

        {/* {coffeMakerList.map(coffeMakerObj => getCoffeMakerCard(coffeMakerObj))} */}
        </Grid>
        </Grid>
                <Grid item xs={false} sm={2} />
        </Grid>
        </Grid>
        
    );
}

const mapStateToProps = (state) => {
    return {
      // cart: state.cartReducer.cart,
      sellername: state.sellerReducer.sellername,
      sellerId: state.sellerReducer.sellerId,
    };
  };
  

export default connect(mapStateToProps)(SellerOrders);