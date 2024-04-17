import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Theme from "./themes/Theme"
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Alert, IconButton, Typography } from '@mui/material'
import { Navbar } from "./components/Navbar"
import { Shop } from "./pages/shop/Shop"
import { Cart } from "./pages/cart/Cart"
import { ShopContextProvider } from './context/Shop-Context'
import { Login } from './pages/reglog/login'
import { Register } from './pages/reglog/register'
import { AuthProvider } from './utils/authContext'
import { checkLoggedIn } from './utils/authUtils'
import { X } from 'phosphor-react'
import {Profile} from './pages/profile/profile'
import {Shipping} from './pages/profile/shipping'
import { AdminSection } from './pages/Admin/adminsection'
import { AdminProductDetail } from './pages/Admin/AdminProductDetail'
import { ProductDetail } from './pages/shop/ProductDetail'

function App() {
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userID');
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [PRODUCTS, setProducts] = useState([]);

  useEffect(() => {
    console.log('Component rendered')
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost/api.php')
      .then((response) => {
        if(!response.ok) {
          throw new Error('Nepodarilo se fetchnout produkty');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error pri fetchovani produktu', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Zpráva o načítání dat
  }
  
  return (
    <div className="App">
      <ShopContextProvider PRODUCTS = {PRODUCTS}>
        <ThemeProvider theme={Theme}>
          <AuthProvider>
            <CssBaseline/>
              <Router>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setHasInteracted={setHasInteracted} />
                  <Routes>
                    <Route path="/" element={<Shop PRODUCTS = {PRODUCTS}/>}/>
                    <Route path="/cart" element={<Cart PRODUCTS = {PRODUCTS}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                    <Route path="/profile" element={<Profile userId={userId}/>}/>
                    <Route path="/shipping" element={<Shipping userId={userId}/>}/>
                    <Route path="/AdminSection" element={<AdminSection PRODUCTS = {PRODUCTS}/>}/>
                    <Route path="/AdminSection/:id" element={<AdminProductDetail />}/>
                    <Route path="/ProductDetail/:id" element={<ProductDetail />}/>
                  </Routes>
                  {isLoggedIn ? <LoginAlert username={username}/> : null}
                  {hasInteracted && !isLoggedIn ? <LogoutAlert/> : null}
              </Router>
            </AuthProvider>
        </ThemeProvider>
      </ShopContextProvider>
    </div>
  );
};

const LoginAlert = ({ username }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    open && (
      <Alert severity="success"sx={{maxWidth: '20vw',marginTop: '100px',position: 'absolute',left: '40vw',right: '40vw',top: '3vh',}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}><X/></IconButton>}>
        <Typography>Vítej, {username}!</Typography>
      </Alert>
    )
  );
};

const LogoutAlert = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    open && (
      <Alert severity="error" sx={{maxWidth: '20vw',marginTop: '100px',position: 'absolute',left: '40vw',right: '40vw',top: '3vh',}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}><X/></IconButton>}>
        <Typography>Byl/a jste odhlášen/a!</Typography>
      </Alert>
    )
  );
};

export default App;