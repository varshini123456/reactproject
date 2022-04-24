import React from "react"
import "./CSS/Orders.css"
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
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

function OrderCard(props){    // OrderCard component is to display a single order

    const classes = useStyles();

    return (
        <div className="g-col-12 order-card">
                                <div className="">
                                    <div className="order-shop">
                                        <div className="order-status-display">
                                            <img src="https://img.icons8.com/ios-filled/40/000000/checked-truck.png"/>
                                            <p className="order-deliver">Ordered Successfully</p>
                                        </div>
                                        <div className={classes.root}>
                                            <Paper className={classes.paper}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <ButtonBase className={classes.image}>
                                                        <img className={classes.img} alt="complex" src="https://tse1.mm.bing.net/th?id=OIP.aVsCOp8h7rvRvGdE2_Ao9gAAAA&pid=Api&P=0&w=161&h=160" />
                                                        </ButtonBase>
                                                    </Grid>
                                                    <Grid item xs={12} sm container>
                                                        <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1" align='left' className={classes.bold}>
                                                            {props.order.date}
                                                            </Typography>
                                                            <Typography gutterBottom variant="subtitle1" align='left' className={classes.bold}>
                                                            {props.order.productname}
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom align='left'>
                                                            {props.order.productbrand}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" align='left'>
                                                            Price : {props.order.productprice}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" align='left'>
                                                            Quantity Ordered : {props.order.cartQuantity}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" align='left'>
                                                            Sold by {props.order.sellername}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item className={classes.button_order}>
                                                        <Box
                                                        component="span"
                                                        m={1}
                                                        className={`${classes.spreadBox} ${classes.box}`}
                                                        >
                                                        <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            style={{ height: 40,  }}
                                                            href="#contained-buttons"
                                                        >
                                                            EXCHANGE
                                                        </Button>
                                                        <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            style={{ height: 40 }}
                                                            href="#contained-buttons"
                                                        >
                                                            RETURN
                                                        </Button>
                                                        </Box>
                                                        </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                        <Typography variant="subtitle1">{props.order.cartQuantity} * {props.order.productprice}/- = {props.order.cartQuantity * props.order.productprice }/-</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
}

export default OrderCard;