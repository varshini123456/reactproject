import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./CSS/UserSignIn.css"
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TimelineIcon from '@material-ui/icons/Timeline';
import SecurityIcon from '@material-ui/icons/Security';
import BuildingIcon from './Images/building.jpg'
import {useNavigate} from 'react-router-dom'
import sellerstore from '../../seller/sellerstore';
import Navbar from '../HomeStart/Navbar';
import axios from 'axios';
const theme = createTheme();

function UserSignIn(){

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        let username =""
        let userId = ""
    if( data.get('email').includes('@') && data.get('password').length>=8)
    {
        const credentials = { email: data.get('email'), password: data.get('password') };
        console.log(credentials)
        axios.post(`http://localhost:5000/login`, credentials)
      .then((res) => {
        if (res.data) {
          const user = {
            userId: res.data.user1.id,
            username: res.data.user1.username,
            isAdmin: res.data.user1.isAdmin,
            token: res.data.token,
          };
          sellerstore.dispatch({ type: "loginUser", payload: {userId: user.userId,username: user.username}});
          console.log("Login Success");
          // Redirecting to home page
          navigate("/user/home");
        }
      })
    }
    else
    {
      // if detais from form data are incorect
      alert("Invalid input");
      navigate("/user/signin");
    }


        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

    return (
        <div >
            <Navbar /> 
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
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    />
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    />
                                    <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    />
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Sign In
                                    </Button>
                                    <Grid container>
                                    <Grid item>
                                        <Link href="/user/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                        </Link>
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
                                <p className="card-text">Reshape your Shopping experience</p>
                                <div>
                                    <div className="sub sub-card-display">
                                        <LocalOfferIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">All Electronics at One Place</p>
                                            <p className="sub-card-text1">Save your time</p>
                                        </div>
                                    </div>
                                    <div className="sub sub-card-display">
                                        <TimelineIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">Buy at your Dream Prices</p>
                                            <p className="sub-card-text1">Save your money and get profit.</p>
                                        </div>
                                    </div>
                                    <div className="sub sub-card-display">
                                        <SecurityIcon className='sub-icon sub-icon-margin'/>
                                        <div className="sub-card ">
                                            <p className="sub-card-text">Secure Your Account</p>
                                            <p className="sub-card-text1">Your Authentication and Authorization is safe and secure.</p>
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

export default UserSignIn