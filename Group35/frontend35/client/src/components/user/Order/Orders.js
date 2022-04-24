import React from 'react'
import Header from '.././UserHomepage/Header'
import "./CSS/Orders.css"
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: '9px 9px 7px 9px',
    },
    paper: {
      borderRadius : '0px',
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1500,
      backgroundColor: '#ece9e9',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    bold :{
      fontWeight : '700',
    },
    box: {
        height: 50,
        display: "flex",
      },
    spreadBox: {
        justifyContent: "space-around",
        alignItems: "left"
      },
    
    
  }));


function Orders({username,userId}){

    const classes = useStyles();

    const [orderinfo,setOrderinfo] = useState({
        orders: []
    })
    // fetch the data of brands and set the data into {brand : []}
    const fetchdata = (userId)=>{
       return fetch(`http://localhost:5000/users/${userId}/orders`).then((response)=>   // fetching the orders of the current user
        response.json()).then((data)=>{
            console.log(data)
            setOrderinfo({
            orders: data
        })
       
           
    })
    } 
    


    useEffect(()=>{
        fetchdata(userId);

    },[])
    
    const {orders} = orderinfo;

    return (
        <>
            {/* importing header from user homepage */}
            <Header />
            <br />

            {/* code for orders page */}
            <div className="order-margin">
                <center>
                    <div className="order-border">
                        <div>
                            <p className="order-heading1">Showing <strong>All orders</strong></p>
                        </div>
                        

            {orders.map((o) => {
                return (
                    
                    <div className="grid order-orders">

                            <OrderCard order={o} />
                        </div> ) })} 
                    
                    </div>
                </center>
            </div>
                
            
        </>
    );
}

const mapStateToProps = (state) => {
    return {
      username: state.userReducer.username,
      userId: state.userReducer.userId
    };
  };
export default connect(mapStateToProps)(Orders);