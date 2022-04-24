import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import sellerstore from './sellerstore'
import {connect} from "react-redux"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import SellerProductForm from './SellerProductForm'
import SellerNavbar from './SellerNavbar'
function SellerBrandList({brandname, sellername, categoryid,sellerId}) {
    const [categoryId,setCategoryId] = useState("");
    const [categoryName,setCategoryName]=useState("");
    const [brandinfo,setBrandinfo] = useState({
        brand: []
    })
    const [cat,setCat] = useState({
        category: []
    })
    
    const fetchdata = (cid)=>{
       return fetch(`http://localhost:5000/categories/${cid}/brands`).then((response)=>
        response.json()).then((data)=>{
            console.log(data)
            setBrandinfo({
            brand: data
        })
       
        
    })
    }

    const fetchcategories=()=>{
        return fetch("http://localhost:5000/categories").then((response)=>
        response.json()).then((data)=>{
            
            setCat({
            category: data})
        }
            )
    }
    const handleid=(cid)=>{
        
        sellerstore.dispatch({type: "sendCategoryid",payload: {cid: cid}});
        
        fetchdata(cid)
        setCategoryId(cid);
        
    }
    const handleClick= (b1)=>{
        sellerstore.dispatch({type: "sendBrand",payload: {brand: b1}});
        
        console.log(b1)
    }    
    useEffect(() => {
        
        fetchcategories()
        
    },[])
    const {brand} = brandinfo
    const {category} = cat

    const handleSubmit=(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);

    }
    return (
        <div>
            <SellerNavbar />
        <div className='row'>
        
        

            {/* <h1> {sellername}</h1> */}
            {/* <Grid component="form" onSubmit={handleSubmit} noValidate>
            
            <Grid container columnspacing={12}> */}
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
            <Grid item style={{marginTop:80}}>

            <div component="form" onSubmit={handleSubmit} noValidate>
            { brand.length > 0 &&  brand.map((b)=>   // Displaying brands if category is selected
                  
                
                  <div style={{marginBottom:50}}>
                  <Typography variant='h4' color="text.secondary" gutterBottom>
                    {b.Name}
                    
                  </Typography>
                 
                      <Button variant="contained" onClick={()=>{
                          handleClick(b.Name)
                      }}>select</Button>
                  
                  </div>
            ) 
              
            }
            { brand.length===0 &&    // Displaying categories when category is not selected
                category.map((c)=>
                <div style={{marginBottom:50}}>
                
                  <Typography variant='h4' color="text.secondary" gutterBottom>
                    {c.Name}
                    
                  </Typography>
                 
                      <Button variant="contained" onClick={()=>{
                          setCategoryName(c.Name)
                          handleid(c.id);
                      }}>select</Button>
                  
             </div> )
            }
            
            </div>
            </Grid>
            <Grid item>
    
  
            <SellerProductForm cid={categoryid}brandname={brandname} sellername={sellername} sellerId={sellerId}/>
            </Grid>
            
            
            </Grid>
            </div>
            
            </div>
            
       
    )
}
const mapStateToProps= (state)=>{   // mapping state to props to send brandname and categoryId
   
    return {
        brandname: state.brandReducer.brand,
        categoryid: state.categoryReducer.cid
    }
}
export default connect(mapStateToProps)(SellerBrandList)