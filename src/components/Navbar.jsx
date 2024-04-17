import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { logout } from '../utils/authUtils';
import { User, CaretLeft, CaretDown } from 'phosphor-react';

export const Navbar = ({ isLoggedIn, setIsLoggedIn, setHasInteracted }) => {
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin');
    console.log(isAdmin);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
        <AppBar position="sticky" sx={{ backgroundColor: '#4500CC'}}>
            <Toolbar>
                <Typography variant="h1" sx={{ flexGrow: 1, color: '#ffffff' }}>
                    <Link to="/" sx={{ textDecoration: 'none'}}>
                        <Button variant="webName" sx={{ color: '#ffffff', border: '1px solid #4500CC'}}>
                            TechHaven
                        </Button>
                    </Link>
                </Typography>
                <>
                {isLoggedIn && (
                    <>
                        <Button
                            variant="linkBttns"
                            sx={{ color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC' }}}
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <User weight='bold' size={20} style={{marginRight: '10px'}}/>{username} {anchorEl ? (<CaretDown weight="bold" style={{ marginLeft: '10px' }} />)
                             : (<CaretLeft weight="bold" style={{ marginLeft: '10px' }} />)}
                        </Button>
                        <Menu
                            id="profile-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#CCCCCC',
                                    border: '2px solid red',
                                },
                                marginTop: '10px',
                            }}
                        >
                            <MenuItem component={Link} to="/profile" onClick={handleClose} sx={{color: '#4500CC'}}>Update Profile</MenuItem>
                            <MenuItem component={Link} to="/shipping" onClick={handleClose} sx={{color: '#4500CC'}}>Update Shipping</MenuItem>
                        </Menu>
                    </>
                )}
                </>
                <>
                {isAdmin === '1' ? (
                    <Link to="/AdminSection" sx={{ textDecoration: 'none' }}>
                        <Button variant="linkBttns" sx={{color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC'}}}>
                            | Produkty - Admin |
                        </Button>
                    </Link>
                )
                :
                (
                    <Link to="/" sx={{ textDecoration: 'none' }}>
                        <Button variant="linkBttns" sx={{color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC'}}}>
                            | Produkty |
                        </Button>
                    </Link> 
                )}
                </>
                {!isLoggedIn && (
                    <Link to="/register" sx={{ textDecoration: 'none' }}>
                    <Button variant="linkBttns"sx={{color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC'}}}>
                        | Registrace |
                    </Button>
                    </Link>
                )}
                {isLoggedIn && (
                    <Button onClick={() => logout(setIsLoggedIn, navigate, setHasInteracted)} variant="linkBttns"sx={{color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC'}}}>
                        | Odhlásit |
                    </Button>
                )}
                {!isLoggedIn && (
                    <Link to="/login" sx={{ textDecoration: 'none' }}>
                    <Button variant="linkBttns"sx={{color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC'}}}>
                        | Přihlášení |
                    </Button>
                </Link>
                )}
                <Link to="/cart" sx={{ textDecoration: 'none' }}>
                    <Button variant="linkBttns" sx={{ color: '#ffffff', border: '1px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', color: '#4500CC' }}}>
                        <ShoppingCart size={24} />
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}