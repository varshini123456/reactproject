import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function SellerProfile({sellername}) {
    const [firstName, processFirstName] = useState("");
    const [lastName, processLastName] = useState("");

    const [city, processCity] = useState("");
    const [address , processAddress] = useState("");
    

    const navigate = useNavigate()
    // taking the details from seller for profile and saving 
    const save = () => {
        var addressInfo = {
            "sellername" : sellername,
            "sellerfirstname" : firstName,
            "sellerlastname" : lastName,
            "city" : city,
            "address" : address
        }

        axios.post("http://localhost:5000/sellerprofile", addressInfo)

        navigate('/seller/home')

    }
    return (

        // style={{background: 'linear-gradient(to right bottom, #99ff66,#66ff99)',height:"100vh",minHeight : '100vh',width:"100vw",minWidth:"100vw"}}

       <Container >
      
        <ThemeProvider theme={theme}>
          <Grid spacing={2} sx={{ height: '100vh' }} wrap="nowrap">
          <Grid item xs={5}>
          
          <Typography variant='h3' style={{fontFamily:'Arial, Helvetica, sans-serif'}}>Profile form for Sellers</Typography>
          <hr
            style={{
                color: 'black',
                backgroundColor: 'black',
                width:1100,
                height: 5
            }}
          />
          
          
          </Grid>
          <Grid item xs={8}>
      
          <Container component="main" maxWidth="xs" style={{background: 'linear-gradient(to right bottom, #F0F8FF,#ef629f)',paddingTop:20,marginLeft:400}}>
            <Card raised="true" style={{padding:20}}>
            <CssBaseline />
           
            
            
            <Box
              sx={{
    
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              
              <Typography component="h1" variant="h5">
                Profile Form
              </Typography>
              <Box component="form" onSubmit={SellerProfile} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  firstName="FirstName"
                  label="first name"
                  firstname="first name"
                  autoComplete="name"
                  autoFocus
                  onChange= {(obj) => processFirstName(obj.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  lastname="LastName"
                  label="last name"
                  lastname="last name"
                  lastname="last name"
                  autoFocus
                  onChange= {(obj) => processLastName(obj.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  address="Address"
                  label="address"
                  address="address"
                  autoFocus
                  onChange= {(obj) => processAddress(obj.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  city="City"
                  label="city"
                  city="city"
                  autoFocus
                  onChange= {(obj) => processCity(obj.target.value)}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={save}
                >
                  Submit
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/seller/profile" variant="body2">
                      
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              
            </Box>
           
            </Card>
            
          </Container>
          </Grid>
          </Grid>
         
        </ThemeProvider>
        </Container>
        

        
    )
}
const mapStateToProps = (state) => {
    return {
        sellername : state.sellerReducer.sellername
    }
}



export default connect(mapStateToProps)(SellerProfile);