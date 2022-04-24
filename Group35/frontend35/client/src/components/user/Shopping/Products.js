import React from 'react';
import {Grid} from '@material-ui/core';
import Product from "./Product";
import useStyles from "./Styles";
import Header from '../UserHomepage/Header';
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import sellerstore from '../../seller/sellerstore';
import {connect} from 'react-redux'


const Products = ({brandname, username}) => {
    const classes = useStyles();

    const [productinfo,setProductinfo] = useState({
        products: []
    })

    const l1 = useLocation();



    const fetchdata = (cat , brandname)=>{

        console.log(cat)

        if(brandname === "" || brandname === undefined){
            return fetch(`http://localhost:5000/categories/${cat}/sellerproduct`).then((response)=>
         response.json()).then((data)=>{
             console.log(data)
             setProductinfo({
             products: data
         })
        
         
     })
        }

    else{
        return fetch(`http://localhost:5000/categories/${cat}/brands/${brandname}/sellerproduct`).then((response)=>
         response.json()).then((data)=>{
             console.log(data)
             setProductinfo({
             products: data
         })
        
         
     })
    }

        
     }


     const [brandinfo,setBrandinfo] = useState({
        brands: []
    })

     const fetchdata1 = (categoryId)=>{

        let url ="http://localhost:5000/categories/" + categoryId + "/brands"
        console.log(url)
        return fetch(url).then((response)=>
         response.json()).then((data)=>{
             console.log(data)
             setBrandinfo({
             brands: data
         })
        
         
     })
     }


    useEffect(() => {
        fetchdata(cat)
        fetchdata1(cat)
        
    },[])
    const {products} = productinfo
    const {brands} = brandinfo


    const getCategory = (pathname) => {
        let str = pathname.split("/")
        return str[str.length - 1]
    }

    let cat = getCategory(l1.pathname)

    

    
    let pro =[];

    for (let i=0; i< products.length; i++){
        if(products[i].cid === cat){
            
            pro.push(products[i])
        }

    }


    const handleSubmit = async(event) => {
        event.preventDefault();
        const fdata = new FormData(event.currentTarget);
        let brand = fdata.get('filterbrand')
        console.log(brand)
        sellerstore.dispatch({type: "sendBrand",payload: {brand: brand}})
        fetchdata(cat,brand)
    }

    console.log(products)
    console.log("dshdhjahdjag")
    return (
        <div>
            <Header username={username}/>

            

            <main className={classes.content}>

            
                
                <div className={classes.toolbar}/>
                <Typography variant="h5">Filter by brands</Typography>
                <FormControl component="form" onSubmit={handleSubmit} style={{width:'20vw'}}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={brands}
                    getOptionLabel={option => option.Name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Brands" name="filterbrand" />}
            
                    />

                    <Button type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>Apply</Button>
                </FormControl>

            <Grid container justify="center" spacing={4}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                        <>shajkhsjaaajas</>
                        <Product product={product} />
                    </Grid>
                ))}
                </Grid> 
            </main>
        </div>
    )
}


const mapStateToProps= (state)=>{
    console.log(state.brandReducer.brand)
    
    return {
        brandname: state.brandReducer.brand,
        username: state.userReducer.username,

    }
}
export default connect(mapStateToProps)(Products)