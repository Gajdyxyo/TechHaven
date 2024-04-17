import React, { useState } from 'react'
import {TextField, Button, Box, Typography, Paper} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Shipping = ({ userId }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const formik = useFormik({
        initialValues: {
            street: '',
            city: '',
            postalCode: '',
        },
        validationSchema: Yup.object({
            street: Yup.string().max(40, 'Maximálně 40 znaků').required('Vyplňte'),
            city: Yup.string().max(40, 'Maximálně 40 znaků').required('Vyplňte'),
            postalCode: Yup.string().max(6, 'PSČ má jen 5 znaků (čísel).').matches(/^[1-9]\d{2}\s?\d{2}$/, 'Zadejte správné PSČ').required('Vyplňte'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost/updateShipping.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        street: values.street,
                        city: values.city,
                        postalCode: values.postalCode,
                        action: 'update_shipping',
                    }),
                });
        
                if (response.ok) {
                    console.log('Shipping successful - React');
                    setSuccessMessage('Změny provedeny úspěšně!');
                    setErrorMessage('');
                } else if (!response.ok) {
                    console.log('Shipping failed - React');
                    const errorData = await response.json();
                    setSuccessMessage('');
                    setErrorMessage(errorData.error);
                } else {
                    console.error('Change failed. Server response:', response.statusText)
                }
            } catch (error) {
                console.error('An error occurred during changes:', error);
            }
        },
    });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 400, margin: 'auto', marginTop: '25vh', marginBottom: '25vh' }}>
    <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '3px solid #4500CC' }}>
        <Typography component="h1" variant="h1" sx={{ color: '#4500CC'}}>
            Dopravní údaje
        </Typography>
        <TextField
        variant="outlined"
        label="Ulice"
        id="street"
        name="street"
        fullWidth
        margin="normal"
        value={formik.values.street}
        onChange={formik.handleChange}
        error={formik.touched.street && Boolean(formik.errors.street)}
        helperText={formik.touched.street && formik.errors.street}
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
            label="Město"
            id="city"
            name="city"
            fullWidth
            margin="normal"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
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
            label="PSČ"
            id="postalCode"
            name="postalCode"
            fullWidth
            margin="normal"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={formik.touched.postalCode && formik.errors.postalCode}
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
        {errorMessage && (
            <Typography color="error" sx={{marginBottom: '20px', marginTop: '20px', fontWeight: '600', fontSize: '14px', border: '2px solid red', padding: '5px'}}>{errorMessage}</Typography>
        )}
        {successMessage && (
            <Typography sx={{color: 'green', marginBottom: '20px', marginTop: '20px', fontWeight: '600', fontSize: '14px', border: '2px solid green', padding: '5px'}}>{successMessage}</Typography>
        )}
        <Button type="submit" variant="contained" sx={{ textDecoration: 'none', backgroundColor: '#4500CC', color: '#FFFFFF',border: '1px solid #4500CC', '&:hover':{backgroundColor: '#FFFFFF', color: '#4500CC', border: '1px solid #4500CC'},}}>
            Provést změnu
        </Button>
    </Paper>
</Box>
  )
}
