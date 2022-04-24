import React from 'react'
import { useState, useEffect } from 'react'
import { FormControl, Input } from '@material-ui/core'

import Button from '@mui/material/Button'
import MobileFeature from "./categoryforms/MobileFeature";
import LaptopFeature from "./categoryforms/LaptopFeatures";
import axios from "axios";
import HeadphoneFeatures from './categoryforms/HeadphoneFeatures';
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'

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
        fdata.append('file',singleFile)
        const obj={}
        //fdata contains key value pairs in format ['key','value']
        //Converting fdata pairs to json
        for (var pair of fdata.entries()) {
            obj[pair[0]]=pair[1]
        //    console.log(pair)
        //     console.log(pair[0] + ': ' + pair[1]);
        }
        
        obj["Category"]=cid; // Storing category id from reducer  and storing in Product Object
        obj["sellerId"]=sellerId;
        await axios.post(`http://localhost:5000/sellers/${sellerId}/sellerproduct`,fdata).then((res)=>console.log("completed")).catch((err)=>console.log(err))// posting the data to sever using axios
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
              
            
                // Form for adding product
            <FormControl component="form" onSubmit={handleSubmit} style={{width:'20vw'}} encType = "multipart/form-data">
            <Input
            placeholder='Seller name'
              margin="dense"
              required
              fullWidth
              id="sellername"
              label="Sellername"
              name="sellername"
              autoComplete="sellername"
              value={sellername} // auto fills when state comes from reducer sellerReducer
             
            />
            <Input
             placeholder='Product Name'
            required
            fullWidth
              name="productname"
              label="productname"
              type="text"
              id="productname"
              autoComplete="productname"
            />

            <Input
             placeholder='Product Image Upload'
            required
            fullWidth
              name="file"
              label="Image Upload"
              type="file"
              id="image"
            //   autoComplete="image"
              onChange={(e) => SingleFileChange(e)}
            />
           
            <Input sx={{borderRadius:20}}
            placeholder='Product Brand'
              margin="normal"
              required
              fullWidth
              name="productbrand"
              label="productbrand"
              type="text"
              id="productbrand"
              autoComplete="productbrand"
              value={brandname} // auto fills when state comes from reducer brandReducer
            />
            
            <Input
            placeholder='Product Price'
              margin="normal"
              required
              fullWidth
              name="productprice"
              label="productprice"
              type="number"
              id="productprice"
              autoComplete="productprice"
            />

            <Input
            placeholder='Product Quantity'
              margin="normal"
              required
              fullWidth
              name="productquantity"
              label="productquantity"
              type="number"
              id="productquantity"
              autoComplete="productquantity"
            />
            
            {
                cid==="61cf2fd30236a97a7bc3c4ca" && <MobileFeature /> //Form for Mobile features
            }
            {
                cid==="61cf30c10236a97a7bc3c4cf" && <LaptopFeature /> // Form for Laptop features
            }
            {
                cid==="624696fe22430c408c3efe61" && <HeadphoneFeatures />
            }

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Submit
                </Button>
                
            </FormControl>
            
           
          

            
        
    )
}


const mapStateToProps = (state) => {
    return {
        sellername : state.sellerReducer.sellername,
        sellerId: state.sellerReducer.sellerId
    }
}



export default connect(mapStateToProps)(SellerProductForm);
