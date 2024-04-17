import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { Typography, Card, CardMedia, CardContent, IconButton, Input} from '@mui/material';
import { Plus, Minus } from "phosphor-react";

export const CartItem = ( props ) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  return (
    <Card sx={{ display: 'flex', width: '100%', boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)', borderRadius: 2.5, margin: 3 }}>
    <CardMedia component="img" image={productImage} alt={productName} sx={{ width: 200, borderRadius: '25px 0 0 25px' }} />
    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Typography variant="h1" component="div" sx={{ color: '#4500CC' }}>
          <b>{productName}</b>
        </Typography>
        <Typography variant="h2" component="div" sx={{ color: 'red', paddingTop: '24px', fontWeight: '600'}}>
          Cena: {price}Kč
        </Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => removeFromCart(id)} sx={{ color: '#4500CC' }}>
          <Minus />
        </IconButton>
        <Input
          value={cartItems[id]}
          onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          inputProps={{ 'aria-label': 'cart item count', style: { width: 40, textAlign: 'center', fontWeight: 'bolder', color: '#4500CC', border: '2px solid #4500CC', borderRadius: 5 } }}
        />
        <IconButton onClick={() => addToCart(id)} sx={{ color: '#4500CC' }}>
          <Plus />
        </IconButton>
      </div>
    </CardContent>
  </Card>
  );
};
