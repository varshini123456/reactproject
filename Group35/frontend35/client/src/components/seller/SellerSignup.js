import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TimelineIcon from '@material-ui/icons/Timeline';
import SecurityIcon from '@material-ui/icons/Security';
import BuildingIcon from '../user/Authentication/Images/building.jpg'

const theme = createTheme();

// Seller signup page
export default function SellerSignup() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // Giving conditiion on the input user is entering
      if(data.get('email').includes('@') && data.get('password').length>=8 && data.get('username').length>=5 && data.get('gst').length===15)
      {
        console.log("hi")
        await axios.post("http://localhost:5000/sellers",{
        sellername: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        gst: data.get('gst'),
        })
      navigate("/seller/login")
  
      }
      else
      {
        alert("Invalid input");
        navigate("/seller/signup")
      }
      
     
  };

  return (
    


    <div>
            <center>
                <div className="row cards">
                    <div className="col-8 col-sm-6">
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                          <CssBaseline />
                          <Box
                            sx={{
                              marginTop: 8,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                              <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                              Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    autoFocus
                                    
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    required
                                    fullWidth
                                    id="gst"
                                    label="GST code"
                                    name="gst"
                                    autoComplete="family-name"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password(atleast 8 characters)"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                  />
                                </Grid>
                                
                              <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Sign Up
                              </Button>
                              <Grid container justifyContent="flex-end">
                                <Grid item>
                                  <Link href="/seller/login" variant="body2">
                                    Already have an account? Sign in
                                  </Link>
                                </Grid>
                              </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          
                        </Container>
                      </ThemeProvider>
                    </div>
                    <div className="col-4 col-sm-6 side">
                    <div className="pt-20 ps-20 pe-20 card">
                            <div className="card-heading">
                                <p className="card-text">Reshape buying for your organisation</p>
                                <div>
                                    <div className="sub sub-card-display">
                                        <LocalOfferIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">Invoice & Bulk Discounts</p>
                                            <p className="sub-card-text1">Save up to 28% more with firstName input credit and avail discounts on multi-unit purchases.</p>
                                        </div>
                                    </div>
                                    <div className="sub sub-card-display">
                                        <TimelineIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">Business Analytics</p>
                                            <p className="sub-card-text1">Track and monitor spending by your organisation with dynamic charts and data tables.</p>
                                        </div>
                                    </div>
                                    <div className="sub sub-card-display">
                                        <SecurityIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">Secure Your Account</p>
                                            <p className="sub-card-text1">Add more colleagues to your account for making business purchases instead of sharing your login credentials.</p>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <img src={BuildingIcon} alt="buildingIcon" className='building-icon' />
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
  );
}



