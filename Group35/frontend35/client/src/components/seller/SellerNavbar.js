import AppBar from '@mui/material/AppBar';
import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom"
import sellerstore from "./sellerstore"


const pages = ['Products', 'Add Product', 'Orders'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//NavBar for SellerInterface

 
const SellerNavbar = () => {
    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = () => {
      sellerstore.dispatch('Logout')

      navigate('/')
    }
    const navigate =useNavigate();
    return (
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            
            component="div"
            style={{fontFamily:'"The Nautigal", cursive',marginRight:30, cursor : 'pointer'}}
            sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
            onClick = {() => navigate('/seller/home')}
          >
            Dream Basket
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
                
              <Button 

              onClick={
                ()=>{
                  navigate("/seller/productList")
                }
              }
               
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                
                Products
              </Button>
              
              
              <Button
               onClick={()=>{
                navigate("/seller/brands")    
               }}
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                
                Add Product
              </Button>
              
              
              <Button
                
                
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={
                  ()=>{
                    navigate("/seller/orders")
                  }
                }
              >
                
                Orders
              </Button>
              

        
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://p.kindpng.com/picc/s/264-2642768_shopping-icon-vector-and-shopping-cart-hd-png.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem>
                  <Button
                  onClick={
                    ()=>{
                      navigate("/seller/profile")
                    }
                  }
                  >
                  <Typography textAlign="center">Profile</Typography>
                  </Button>

                </MenuItem>

                <MenuItem>
                  <Button
                  onClick={
                    () => {
                      
                      sellerstore.dispatch({type:"Logout"})
                      navigate('/')
                      
                    }
                  }
                  >
                  <Typography textAlign="center">Logout</Typography>
                  </Button>
                  
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
     );
}
 
export default SellerNavbar;