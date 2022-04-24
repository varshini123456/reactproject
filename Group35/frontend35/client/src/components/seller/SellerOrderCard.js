import React from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {  CardMedia } from "@material-ui/core";
import {useState, useEffect} from "react"

const SellerProductCard = props => {


    const [profile, setProfile] = useState({profiles : []})

    const fetchData = (userId) =>{    // This get the user profile details
        return fetch(`http://localhost:5000/user/${userId}/userprofile`)
            .then((response) => response.json())
            .then((data)=> {
                setProfile({profiles : data
                })
                console.log(data)
            });
    }
 
    useEffect(()=>{
        fetchData(props.product.userId)
    },[])


    const {profiles} = profile;

  return (
    <div>
        {profiles.map((p) => { 
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
              Quantity Ordered: {props.product.cartQuantity}
              </Typography>
              <Typography variant="h6" component="p" >
              Delivery Details :
              </Typography>
              <Typography variant="h6" component="p">
                From user :{props.product.username}
              </Typography>
              <Typography variant="body2" component="p">
              Delivery Address: {p.address}
              </Typography>
              <Typography variant="body2" component="p">
              City: {p.city}
              </Typography>
              
            </CardContent>
            {/* <CardActions>
              <Button size="small">BUY NOW</Button>
              <Button size="small">OFFER</Button>
            </CardActions> */}
          </Card>
        )
    })}
    </div>
  );
};

export default SellerProductCard;