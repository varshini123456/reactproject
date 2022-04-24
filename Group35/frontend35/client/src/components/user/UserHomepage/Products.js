import React from "react"
import {Grid} from '@material-ui/core';
import Product from "./Product";
import useStyles from "../Shopping/Styles";
import Header from '../UserHomepage/Header';
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import sellerstore from '../../seller/sellerstore';
import {connect} from 'react-redux'


function Products({username}){

    const classes = useStyles();

    const [productinfo,setProductinfo] = useState({
        products: []
    })


    const fetchdata = ()=>{


            return fetch(`http://localhost:5000/sellerproduct`).then((response)=>
         response.json()).then((data)=>{
             console.log(data)
             setProductinfo({
             products: data
         })
        
         
     })
        
     }

    useEffect(() => {
        fetchdata()
        
    },[])
    const {products} = productinfo

    return (
        <div>
            <Grid container justify="center" spacing={4}>
                {products.map((product)=>{
                    
                    return (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                    );
                    
                })}
                </Grid> 
        </div>
    );
}

const mapStateToProps= (state)=>{
    console.log(state.brandReducer.brand)
    
    return {
        brandname: state.brandReducer.brand,
        username: state.userReducer.username,

    }
}
export default connect(mapStateToProps)(Products)