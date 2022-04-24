import React from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {  CardMedia } from "@material-ui/core";

const SellerProductCard = props => {
  return (
    <Card>
      <CardMedia style={{ height: "150px" }} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvcMbxT5lRH4-nYz3QTqPJQmnV9FQDGPzTQ&usqp=CAU" />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.product.productname}
        </Typography>
        <Typography variant="body2" component="p">
          Brand  : {props.product.productbrand}
        </Typography>
        <Typography variant="body2" component="p" style = {{fontWeight : 'bold'}}>
          Price : {props.product.productprice}/-
        </Typography>
        <Typography variant="body2" component="p">
        Quantity: {props.product.productquantity}
        </Typography>

      </CardContent>
      {/* <CardActions>
        <Button size="small">BUY NOW</Button>
        <Button size="small">OFFER</Button>
      </CardActions> */}
    </Card>
  );
};

export default SellerProductCard;