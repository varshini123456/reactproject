import React from 'react'
import { useState, useEffect } from 'react'
import { FormControl, Input } from '@material-ui/core'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import MobileFeature from "./categoryforms/MobileFeature";
import LaptopFeature from "./categoryforms/LaptopFeatures";
import axios from "axios";
import HeadphoneFeatures from './categoryforms/HeadphoneFeatures';
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import "./SellerSignup.css"
import Container from '@mui/material/Container';
import {  TextField, Card, CardContent, Typography } from '@material-ui/core';

function SellerProductForm({brandname, sellername, cid,sellerId}) {
    //For storing the brands information based on data and updating in {brand: []}
    const [brandsinfo,setBrandsinfo] = useState({
        brand: []
    })
    const [singleFile, setSingleFile] = useState('');
    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
    }
    // fetch the data of brands and set the data into {brand : []}
    const fetchdata = ()=>{
       return fetch("http://localhost:5000/brands").then((response)=>
        response.json()).then((data)=>{
            console.log(data)
            setBrandsinfo({
            brand: data
        })
       
        
    })
    }

    const navigate = useNavigate();
    //Data from the Form control is stored by handlesubmit which creates the Product object. 
    const handleSubmit = async(event) => {
        event.preventDefault();
        const fdata = new FormData(event.currentTarget);
        // fdata.append('file',singleFile)
        const obj={}
        //fdata contains key value pairs in format ['key','value']
        //Converting fdata pairs to json
        for (var pair of fdata.entries()) {
            obj[pair[0]]=pair[1]
        //    console.log(pair)
        //     console.log(pair[0] + ': ' + pair[1]);
        }
        console.log(obj)
        
        obj["Category"]=cid; // Storing category id from reducer  and storing in Product Object
        obj["sellerId"]=sellerId;

        let prod = {
            sellername: fdata.get('sellername'),
            productname: fdata.get('productname'),
            productbrand: fdata.get('productbrand'),
            productprice: fdata.get('productprice'),
            ram: fdata.get('ram'),
            storage: fdata.get('storage'),
            color: fdata.get('color') ,
            connectorType:fdata.get('connectorType'),
            productquantity : fdata.get('productquantity'),
            Category : cid
        }
        await axios.post(`http://localhost:5000/sellers/${sellerId}/sellerproduct`,prod).then((res)=>console.log("completed")).catch((err)=>console.log(err))// posting the data to sever using axios
        console.log(
            sellerId
            
            // sellername: fdata.get('sellername'),
            // productname: fdata.get('productname'),
            // produtbrand: fdata.get('productbrand'),
            // productprice: fdata.get('productprice'),
            // ram: fdata.get('ram'),
            // storage: fdata.get('storage'),
            // colour: fdata.get('colour') ,
            // connectorType:fdata.get('connectorType'),
            // qty : fdata.get('productquantity'),
            
        )

        navigate('/seller/productList')
    }
    const seller=brandname // storing brandname from redux in seller varialble
    useEffect(() => {
        fetchdata()
        
        console.log(seller)
    },[])
    // const {brand} = brandsinfo // storing the array of objects in brand obtained from brandinfo
    return (
          
        <div className="s-App"> 
        <br></br>
        <Typography gutterBottom variant="h4" align="center">
          Add Product
         </Typography>
         
        <Grid>
          <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Fill up the form to add your product
            </Typography> 
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField placeholder="Enter seller name" name="sellername" label="Seller Name" variant="outlined" value={sellername} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField placeholder="Enter product name" name="productname" label="Product Name" variant="outlined" fullWidth required />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField type="text" placeholder="Enter product brand" name="productbrand" label="Product Brand" variant="outlined"  value={brandname} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField type="number" placeholder="Enter product price" name="productprice" label="Product Price" variant="outlined" fullWidth required />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField type="number" placeholder="Enter product quantity" name="productquantity" label="Product Quantity" variant="outlined" fullWidth required />
                  </Grid>
                  {/* <p style={{marginLeft: '4px', fontWeight:'bolder', marginBottom: '0px'}}>Upload image</p> */}

                  < Grid item xs={12}>
                  {/* <TextField
             placeholder='Product Image Upload'
            required
            fullWidth
              name="file"
              label="Image Upload"
              type="file"
              id="file"
            //   autoComplete="image"
              onChange={(e) => SingleFileChange(e)}
            /> */}
             {
                cid==="61cf2fd30236a97a7bc3c4ca" && <MobileFeature /> //Form for Mobile features
            }
            {
                cid==="61cf30c10236a97a7bc3c4cf" && <LaptopFeature /> // Form for Laptop features
            }
            {
                cid==="624696fe22430c408c3efe61" && <HeadphoneFeatures />
            }
                 
                 </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>Submit </Button>
                  </Grid>
  
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
        
    )
}


const mapStateToProps = (state) => {
    return {
        sellername : state.sellerReducer.sellername,
        sellerId: state.sellerReducer.sellerId
    }
}



export default connect(mapStateToProps)(SellerProductForm);