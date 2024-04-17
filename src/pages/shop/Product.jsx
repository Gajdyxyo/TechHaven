import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/Shop-Context'
import { Card, CardContent, Typography, Button } from '@mui/material'

export const Product = (props) => {
    const { id, productName, price, productImage, description, stock } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];
    const navigate = useNavigate();

    const handleProductClick = (product) => {
      console.log("ID:", product.id);
      console.log("Product:", product);
      navigate(`/ProductDetail/${product.id}`, { state: { productId: product.id, product: product } });
  };

    return (
        <Card className="product-card" sx={{ backgroundColor: '#4500CC', color: '#FFFFFF', position: 'relative', width: '18vw', height: '70vh', borderRadius: '2%', border: '5px solid #4500CC' }}>
            <img src={productImage} alt={productName} className="product-image" style={{ display: 'block', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: '1.5%', marginTop: '0.5px' }} onError={(e) => console.error("image failed to load")} />
            <CardContent sx={{ marginBottom: '64px' }}>
                
                <Button onClick={() => handleProductClick(props.data)} sx={{ textTransform: 'none', textDecoration: 'none', color: '#FFFFFF', '&:hover': { color: 'skyblue' } }}>
                  <Typography gutterBottom variant="h2">  
                    {productName}
                  </Typography>
                </Button>
                <Typography variant="body1" sx={{textAlign: 'left', margin: '20px 10px 10px 10px'}}>{description}</Typography>
                <Typography variant="body2" sx={{ position: 'absolute', left: 10, bottom: 40, color: 'red', fontWeight: '500', background: '#FFFFFF', padding: '0.2vw', border: '2px solid red' }}>
                    {price} Kč
                </Typography>
                <Typography variant="body2" sx={{position: 'absolute', left: 10, bottom: 10}}>Na skladě: {stock}</Typography>
                <Button variant="contained" onClick={() => addToCart(id)} sx={{ textTransform: 'none', textDecoration: 'none', color: '#4500CC', backgroundColor: '#FFFFFF', border: '3px solid #FFFFFF', position: 'absolute', right: 5, bottom: 5, '&:hover': { backgroundColor: 'red', color: '#FFFFFF', border: '3px solid red' } }}>
                    Do košíku {cartItemAmount > 0 && `(${cartItemAmount})`}
                </Button>
            </CardContent>
        </Card>
    );
};
