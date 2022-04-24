import React from "react";
import SellerNavbar from "./SellerNavbar"
import { connect } from "react-redux";
import { Box, Button, Typography } from "@material-ui/core";

import Grid from "@mui/material/Grid"


//Creating home page for seller after signin
const SellerHomepage = ({sellername}) => {

    return ( 
        <div>
        
        <SellerNavbar/>
        
        
        <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
        <Grid item xs={4}>
        <Typography style={{marginLeft:50,fontFamily:'"Kaushan Script", cursive'}} variant="h4">Hi {sellername} ,thanks for joining our journey of Dream Basket. You can add your product by clicking the following button.</Typography>
        
        </Grid>
        <Grid item xs={8}>
        <Box style={{marginTop:120,marginLeft:120}}
        component="img"
        sx={{
         
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The seller image."
        src="https://socialmediaweek.org/wp-content/blogs.dir/1/files/ecommerce-defsys-1.jpg"
        />
         </Grid>
        </Grid>

    
        {/* <Grid container spacing={1} style={{marginTop:200}}>
        <Grid container item spacing={3}>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://socialmediaweek.org/wp-content/blogs.dir/1/files/ecommerce-defsys-1.jpg"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
         ts except Antarctica
        </Typography>
      </CardContent>
      
    </Card>
            
        </Grid>
        <Grid container item spacing={3}>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://socialmediaweek.org/wp-content/blogs.dir/1/files/ecommerce-defsys-1.jpg"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      
    </Card>
           
        </Grid>
        <Grid container item spacing={3}>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://socialmediaweek.org/wp-content/blogs.dir/1/files/ecommerce-defsys-1.jpg"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      
      </Card>
        </Grid>
        </Grid> */}
        </div>

        
     );
}

const mapStateToProps= (state)=>{
    console.log(state.brandReducer.brand)
    
    return {
        brandname: state.brandReducer.brand,
        categoryid: state.categoryReducer.cid
    }
}
export default connect(mapStateToProps)(SellerHomepage);
 
