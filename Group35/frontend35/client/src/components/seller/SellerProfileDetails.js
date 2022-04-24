import React from 'react'
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import SellerNavbar from './SellerNavbar'
import SellerProfile from './SellerProfile';
import AppBar from '@material-ui/core/AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from "@material-ui/core/Card"
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import { Typography } from '@mui/material';


function SellerProfileDetails({sellername}) {
    const [profile, setProfile] = useState({profiles : []})

    const fetchData = (sellername) =>{
        return fetch(`http://localhost:5000/sellerprofile?sellername=${sellername}`)   // fetching the Profile details if exist
            .then((response) => response.json())
            .then((data)=> {
                setProfile({profiles : data
                })
                console.log(data)
            });
    }

    useEffect(()=>{
        fetchData(sellername)
    },[])


    const {profiles} = profile;

   
    
    return (
        <div>
            <div>
            <SellerNavbar/>
            </div>
            {/* IF profile data is not present display form */}
            {profiles.length === 0 && <SellerProfile />}  
            {/* Display profile data  */}
            {profiles.length !== 0 && <center>  
    {profiles.map((profile) =>{
        return (
        <table style={{width:"40vw",height:"40vh"}}>
        <MuiThemeProvider>
        <>
          
            <Card style={{marginTop:80}} raised="true">
            <AppBar title="Profile" />
            <List>
            <ListItem>
                <AccountCircleIcon fontSize="large"/>
                <Typography style={{marginLeft:20,fontSize:20}}>Profile of {sellername}</Typography>
              </ListItem>

              <ListItem>
                <ListItemText primary="First Name" secondary={profile.sellerfirstname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={profile.sellerlastname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Adress" secondary={profile.address} />
              </ListItem>
              
              <ListItem>
                <ListItemText primary="City" secondary={profile.city} />
              </ListItem>

            </List>
            <br />
            </Card>


          
        </>
      </MuiThemeProvider>
    </table>
        )
    })}
</center>}
            
        </div>
        
    )
}
const mapStateToProps = (state) => {
    return {
        sellername : state.sellerReducer.sellername
    }
}



export default connect(mapStateToProps)(SellerProfileDetails);