import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/Shop-Context'
import { Card, CardContent, Typography, Button } from "@mui/material"

export const ProductDetail = () => {
    const location = useLocation();
    const { productId, product } = location.state || {};
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[product.id];
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            {product ? (
            <Card className="cardProduct" sx={{ backgroundColor: '#4500CC', color: '#FFFFFF', position: 'relative', width: '35vw', height: '80vh', borderRadius: '2%', border: '5px solid #4500CC' }}>
                <img src={product.productImage} alt={product.productName} className="imageProduct" style={{ display: 'block', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: '1.5%', marginTop: '5vh' }} onError={(e) => console.error("image failed to load")} />
                <CardContent sx={{ marginBottom: '64px' }}>
                    <Typography gutterBottom variant="h2">
                            {product.productName}
                    </Typography>
                    <Typography variant="body3" sx={{ position: 'absolute', left: 10, bottom: 40, color: 'red', fontWeight: '500', background: '#FFFFFF', padding: '5px', border: '2px solid red' }}>
                        {product.price} Kč
                    </Typography>
                    <Button variant="contained" onClick={() => addToCart(product.id)} sx={{ textTransform: 'none', textDecoration: 'none', color: '#4500CC', backgroundColor: '#FFFFFF', border: '3px solid #FFFFFF', position: 'absolute', right: 5, bottom: 5, '&:hover': { backgroundColor: 'red', color: '#FFFFFF', border: '3px solid red' } }}>
                        Do košíku {cartItemAmount > 0 && `(${cartItemAmount})`}
                    </Button>
                </CardContent>
            </Card>
            ) : (
                <p>No product selected</p>
            )}
        </div>
    );
};
