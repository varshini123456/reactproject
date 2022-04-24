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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


function UserProfile({username,userId}) {
    const [firstName, processFirstName] = useState("");
    const [lastName, processLastName] = useState("");

    const [city, processCity] = useState("");
    const [address , processAddress] = useState("");
    

    const navigate = useNavigate()
    // taking the details from user for profile and saving 
    const save = (userId) => {
        var addressInfo = {
            "username" : username,
            "userfirstname" : firstName,
            "userlastname" : lastName,
            "city" : city,
            "address" : address
        }

        axios.post(`http://localhost:5000/users/${userId}/userprofile`, addressInfo)

        navigate('/user/home')

    }
    return (
        <Container >
      
        <ThemeProvider theme={theme}>
          <Grid spacing={2} sx={{ height: '100vh' }} wrap="nowrap">
          <Grid item xs={5}>
          
          <Typography variant='h3' style={{fontFamily:'Arial, Helvetica, sans-serif'}}>Profile form for Users</Typography>
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
              <Box component="form" onSubmit={UserProfile} noValidate sx={{ mt: 1 }}>
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
                  autoFocus
                  onChange= {(obj) => processLastName(obj.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  address="Address"
                  label="address"
                  autoFocus
                  onChange= {(obj) => processAddress(obj.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  city="City"
                  label="city"
                  autoFocus
                  onChange= {(obj) => processCity(obj.target.value)}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={()=>save(userId)}
                >
                  Submit
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/user/profile" variant="body2">
                      
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
        username : state.userReducer.username,
        userId: state.userReducer.userId
    }
}



export default connect(mapStateToProps)(UserProfile);