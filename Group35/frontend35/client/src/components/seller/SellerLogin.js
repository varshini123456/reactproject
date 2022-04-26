import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import {useNavigate} from 'react-router-dom'
import sellerstore from './sellerstore';
import Navbar from '../user/HomeStart/Navbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TimelineIcon from '@material-ui/icons/Timeline';
import SecurityIcon from '@material-ui/icons/Security';
import BuildingIcon from '../user/Authentication/Images/building.jpg'
import axios from 'axios';

// import "./Sellerlogin.css"

// const styles = {
//   paperContainer: {
//       backgroundImage: "url(" + loginBackground + ")",
//       backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     width: '100vw',
//     height: '100vh'
//   },
  
// };

const theme = createTheme();

export default function SellerLogin() {
  const navigate = useNavigate();
  //For validating and storing the user information based on formdata and sending sending  user state using sellerstore if details are correct.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let sellername =""
    let sellerId = ""
    if( data.get('email').includes('@') && data.get('password').length>=8)
    {
        const credentials = { "email": data.get('email'), "password": data.get('password') };
        axios.post(`http://localhost:5000/sellerlogin`, credentials)
      .then((res) => {
        if (res.data) {

          const seller = {
            sellerId: res.data.user1.id,
            sellername: res.data.user1.sellername,
            token: res.data.token
          };
          sellerstore.dispatch({type:"loginSeller",payload: { sellername: seller.sellername,sellerId:seller.sellerId}})
          console.log("Login Success");
          // Redirecting to home page
          navigate("/seller/home");
        }
      })
    }
    else
    {
      // if detais from form data are inccorect
      alert("Invalid input");
      navigate("/seller/login");
    }
    
    
  };

  return (

    <div>
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
                                <Link href="/seller/signup" variant="body2">
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
    
    // <Container style={{background: 'linear-gradient(to right bottom, #eecda3,#ef629f)',height:"100vh",minHeight : '100vh',width:"100vw",minWidth:"100vw"}}>
      
    // <ThemeProvider theme={theme}>
    //   <Grid spacing={2} sx={{ height: '100vh' }} wrap="nowrap">
    //   <Grid item xs={5}>
      
    //   <Typography variant='h1' style={{fontFamily:'"The Nautigal", cursive'}}>Dream Basket  for Sellers</Typography>
    //   <hr
    //     style={{
    //         color: 'black',
    //         backgroundColor: 'black',
    //         width:"97vw",
    //         height: 5
    //     }}
    //   />
      
    //    {/* <img src="https://cdn-icons-png.flaticon.com/512/2575/2575886.png" alt="logo" style={{width:"30px",height:"30vh",marginTop:70,marginLeft:50}}/> */}
      
      
    //   </Grid>
    //   <Grid item xs={8}>
  
    //   <Container component="main" maxWidth="xs" style={{background: 'linear-gradient(to right bottom, #eecda3,#ef629f)',paddingTop:20,marginLeft:900}}>
    //     <Card raised="true" style={{padding:20}}>
    //     <CssBaseline />
       
        
        
    //     <Box
    //       sx={{

    //         marginTop: 5,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
          
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item>
    //             <Link href="/seller/signup" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
          
    //     </Box>
       
    //     </Card>
        
    //   </Container>
    //   </Grid>
    //   </Grid>
     
    // </ThemeProvider>
    // </Container>
    
    
   
  );
}