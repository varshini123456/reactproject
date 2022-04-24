import React from 'react'
import {Box, makeStyles, Button, Typography, Badge} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import sellerstore from '../../seller/sellerstore';
import {useNavigate} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { connect } from 'react-redux';
const useStyle = makeStyles({
    login : {
        background : '#FFFFFF',
        color : 'skyblue',
        textTransform : 'none',
        fontWeight : 600,
        borderRadius : 2,
        padding : '5px 40px',
        boxShadow : 'none',
        height : 30,
        marginLeft: 10,

    },

    wrapper :{
        margin : '0 0% 0 1px',
        display : 'flex',
        '& > *' : {
            marginRight : 40,
            alignItems : 'center'
        }
        
    },
    container : {
        display : 'flex',
    },
    logout :{
        background : '#FFFFFF',
        color : 'skyblue',
        textTransform : 'none',
        fontWeight : 600,
        borderRadius : 2,
        padding : '5px 40px',
        boxShadow : 'none',
    }
})

function HeaderButtons({username, quantity}){

    const classes = useStyle()

    const navigate = useNavigate();

    const Logout = () => {
        sellerstore.dispatch({type:"logout"})
        navigate('/')
    }

    return (
        <Box className={classes.wrapper}>
            <Typography >Hi,{username}</Typography>
            <NavLink to="/user/profile"><AccountCircleIcon /></NavLink>

            <Box className={classes.container}>
                {/* <Badge badgeContent={} color="secondary"> */}
                    
                    <ShoppingCartIcon  />
                {/* </Badge> */}
                    <NavLink to="/user/cart">
                        <Typography style={{marginLeft : '10px'}}>Cart</Typography>
                    </NavLink>

                    <NavLink to="/user/orders">
                        <LocalShippingIcon style={{marginLeft : '35px'}} />
                    </NavLink>
            </Box>

            <Button variant="contained" onClick={Logout} className = {classes.logout}>Logout</Button>

            <Button ></Button>


        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        quantity : state.cartReducer.quantity,
        username: state.userReducer.username,
    };
  };
  
  export default connect(mapStateToProps)(HeaderButtons);