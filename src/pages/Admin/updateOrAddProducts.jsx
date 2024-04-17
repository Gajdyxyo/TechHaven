import React from 'react'
import { Card, CardContent, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

export const UpdateOrAddProducts = (props) => {
    const { id, productName, price, productImage } = props.data;
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(id);
        if(id){
            navigate(`/AdminSection/${id}`);
        }
        else {
            console.error('invalid id debile');
        }
    }
    return (
        <Card className="productCard" sx={{backgroundColor: '#4500CC', color:'#FFFFFF', position: 'relative', width: '18vw', height: '70vh', borderRadius: '2%', border: '5px solid #4500CC'}}>
            <img
                src={productImage}
                alt={productName}
                className="productImage"
                style={{ display: 'block', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: '1.5%', marginTop: '0.5px'}}
                onError={(e) => console.error("image failed to load")}
            />
            <CardContent sx={{ marginBottom: '64px'}}>
              <Typography gutterBottom variant="h2">
                {productName}
              </Typography>
              <Typography variant="body3" sx={{position: 'absolute', left: 10, bottom: 40, color: 'red', fontWeight: '500', background: '#FFFFFF', padding: '5px', border: '2px solid red'}}>
                {price} Kč
              </Typography>
                <Button variant= "contained" onClick={handleClick} sx={{textTransform: 'none', textDecoration: 'none', color: '#4500CC', backgroundColor: '#FFFFFF', border: '3px solid #FFFFFF', position: 'absolute', right: 5, bottom: 5, '&:hover':{ backgroundColor: 'red', color: '#FFFFFF', border: '3px solid red'}}}>
                    Upravit
                </Button>
            </CardContent>
        </Card>
      )
}
