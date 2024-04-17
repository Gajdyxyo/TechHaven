import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";
//import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import {Box, Typography, Button} from '@mui/material'

export const Cart = ({PRODUCTS}) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '30%', marginBottom: '20px' }}>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0 && product.price) {
            return <CartItem data={product} />;
          }
        })}
      </Box>
      {totalAmount > 0 ? (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#4500CC', marginBottom: '10px' }}>Celkem: {totalAmount}Kč</Typography>
          <Button onClick={() => navigate('/')} sx={{ backgroundColor: '#4500CC', color : '#FFFFFF', border: '2px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #4500CC', color: '#4500CC'}, margin: '10px'}}>
            Pokračovat v nákupu
          </Button>
          <Button variant="contained" onClick={() => console.log('Order placed')} sx={{backgroundColor: '#4500CC', color : '#FFFFFF', border: '2px solid #4500CC', '&:hover': {backgroundColor: '#FFFFFF', border: '2px solid #4500CC', color: '#4500CC'}, margin: '10px'}}>
            Objednat
          </Button>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <Typography variant="h1" sx={{ color: '#4500CC', marginBottom: '10px' }}>Košík je prázdný</Typography>
        <Button onClick={() => navigate('/')} sx={{ backgroundColor: '#4500CC', color : '#FFFFFF', border: '2px solid #4500CC', '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #4500CC', color: '#4500CC'}, margin: '10px'}}>
          Nakupovat
        </Button>
      </Box>
      )}
    </Box>
  );
};
