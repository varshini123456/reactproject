import React from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {  CardMedia } from "@material-ui/core";

const SellerProductCard = props => {
  return (
    <Card style={{padding: "3px", backgroundColor: "black"}}>
    <Card>
      <CardMedia style={{ height: "150px" }} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvcMbxT5lRH4-nYz3QTqPJQmnV9FQDGPzTQ&usqp=CAU" />
      <CardContent>
        <center>
        <Typography variant="h5" component="h3">
          {props.product.productname}
        </Typography>
        <Typography variant="h6" component="p">
          Brand  : {props.product.productbrand}
        </Typography>
        <Typography variant="h6" component="p" style = {{fontWeight : 'bold'}}>
          Price : {props.product.productprice}/-
        </Typography>
        <Typography variant="h6" component="p">
          
        Quantity: {props.product.productquantity}
        </Typography>
        </center>
      </CardContent>
      {/* <CardActions>
        <Button size="small">BUY NOW</Button>
        <Button size="small">OFFER</Button>
      </CardActions> */}
    </Card>
    </Card>
  );
};

export default SellerProductCard;