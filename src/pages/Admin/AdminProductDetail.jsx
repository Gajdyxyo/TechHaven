import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useFormik } from 'formik';

export const AdminProductDetail = () => {
    const location = useLocation();
    const productId = location.state.productId;
    const product = location.state.product;
    const formik = useFormik({
        initialValues: {
            productId: productId,
            productName: product.productName,
            productImage: product.productImage,
            productPrice: product.price,
        },
        onSubmit: async (values, { setSubmitting}) => {
            try {
                const response = await fetch('http://localhost/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productId,
                        productName: values.productName, 
                        productPrice: values.productPrice,
                        productImage: values.productImage,
                        action: 'updateProduct',
                    }),
                });
        
                const data = await response.json();
                
                if (response.ok) {
                    console.log('proslo to');
                } else {
                    console.log('je to v pici');
                }
            } catch (error) {
                console.error('nejaka picovina:', error);
            } finally {
                setSubmitting(false);
            }
        },
        validate: (values) => {
            const errors = {};
            if (!values.productName) {
                errors.productName = 'Název produktu je povinný';
            }
            if (!values.productPrice) {
                errors.productPrice = 'Cena produktu je povinná';
            } else if (!/^\d+(\.\d{1,2})?$/.test(values.productPrice)) {
                errors.productPrice = 'Cena produktu musí být číslo (max. 2 desetinná místa)';
            }
            return errors;
        }
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ 
                    backgroundColor: '#4500CC', 
                    color: '#FFFFFF', 
                    position: 'relative', 
                    width: '20vw',
                    height: '70vh',
                    borderRadius: '2%', 
                    border: '5px solid #4500CC',
                    top: '10vh',
                }}>
                <img
                    src={product.productImage}
                    alt={product.productName}
                    className="product-image"
                    style={{ display: 'block', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: '1.5%', marginTop: '0.5px', width: '100%'}}
                    onError={(e) => console.error("image failed to load")}
                />
                    <CardContent>
                        <Typography gutterBottom variant="h2" sx={{marginLeft: '1.5vw'}}>
                            {product.productName}
                        </Typography>
                        <Typography variant="body3" sx={{position: 'absolute', left: 10, bottom: 40, color: 'red', fontWeight: '500', background: '#FFFFFF', padding: '5px', border: '2px solid red'}}>
                            {product.price} Kč
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: '30vw', margin: 'auto', marginTop: '30vh'}}>
                    <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '3px solid #4500CC' }}>
                        <Typography component="h1" variant="h1" sx={{ color: '#4500CC'}}>
                            Upravit produkt
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="Název produktu"
                            id="productName"
                            name="productName"
                            fullWidth
                            margin="normal"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                            helperText={formik.touched.productName && formik.errors.productName}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4500CC',
                                        outline: 'none',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#4500CC',
                                    '&.Mui-focused': {
                                        color: '#4500CC',
                                    },
                                },
                            }}
                            InputProps={{ style: { color: '#4500CC' } }}
                        />
                        <TextField
                            variant="outlined"
                            label="Cena produktu"
                            id="productPrice"
                            name="productPrice"
                            fullWidth
                            margin="normal"
                            value={formik.values.productPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
                            helperText={formik.touched.productPrice && formik.errors.productPrice}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4500CC',
                                        outline: 'none',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#4500CC',
                                    '&.Mui-focused': {
                                        color: '#4500CC',
                                    },
                                },
                            }}
                            InputProps={{ style: { color: '#4500CC' } }}
                        />
                        <TextField
                            variant="outlined"
                            label="URL obrázku"
                            id="productImage"
                            name="productImage"
                            fullWidth
                            margin="normal"
                            value={formik.values.productImage}
                            onChange={formik.handleChange}
                            error={formik.touched.productImage && Boolean(formik.errors.productImage)}
                            helperText={formik.touched.productImage && formik.errors.productImage}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#4500CC',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4500CC',
                                        outline: 'none',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#4500CC',
                                    '&.Mui-focused': {
                                        color: '#4500CC',
                                    },
                                },
                            }}
                            InputProps={{ style: { color: '#4500CC' } }}
                        />
                        <Button type="submit" variant="contained" sx={{ textDecoration: 'none', backgroundColor: '#4500CC', color: '#FFFFFF',border: '1px solid #4500CC', marginTop: '1vh' , '&:hover':{backgroundColor: '#FFFFFF', color: '#4500CC', border: '1px solid #4500CC'},}}>
                            Upravit
                        </Button>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
}
