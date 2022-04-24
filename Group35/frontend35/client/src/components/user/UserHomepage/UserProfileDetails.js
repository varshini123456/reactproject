import React from 'react'
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import UserProfile from './UserProfile';
import Header from './Header';
import { Typography } from '@mui/material';
import AppBar from '@material-ui/core/AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from "@material-ui/core/Card"
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
function UserProfileDetails({username,userId}) {
    const [profile, setProfile] = useState({profiles : []})

    const fetchData = (userId) =>{
        return fetch(`http://localhost:5000/user/${userId}/userprofile`)
            .then((response) => response.json())
            .then((data)=> {
                setProfile({profiles : data
                })
                console.log(data)
            });
    }

    useEffect(()=>{
        fetchData(userId)
    },[])


    const {profiles} = profile;

    
    
    return (
        <div>
            <Header style={{marginBottom: "1000px"}} username={username} />

            <br />
            <br />
            <br />

            {profiles.length === 0 && <UserProfile />} 

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
                <Typography style={{marginLeft:20,fontSize:20}}>Profile of {username}</Typography>
              </ListItem>

              <ListItem>
                <ListItemText primary="First Name" secondary={profile.userfirstname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={profile.userlastname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={profile.address} />
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
        username : state.userReducer.username,
        userId: state.userReducer.userId

    }
}



export default connect(mapStateToProps)(UserProfileDetails);