import React, { useState } from 'react'
import {TextField, Button, Box, Typography, Paper} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Nesprávný e-mail adresa').required('Vyplňte'),
            username: Yup.string().min(6, 'Jméno musí mít minimálně 6 znaků.').max(20, 'Maximálně 20 znaků').required('Vyplňte'),
            password: Yup.string().min(6, 'Heslo musí mít minimálně 6 znaků.').max(20, 'Maximálně 20 znaků').required('Vyplňte'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hesla se neshodují').required('Vyplňte'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...values,
                        action: 'register',
                    }),
                });

                if (response.ok) {
                    console.log('Registration successful - React');
                    setSuccessMessage('Registrace úspěšná!');
                    setErrorMessage('');
                }
                else if(!response.ok) {
                    console.log('Registrace neuspesna - React');
                    const errorData = await response.json();
                    setSuccessMessage('');
                    setErrorMessage(errorData.error);
                }
                else {
                    console.error('Registration failed. Server response:', response.statusText)
                }
            } catch (error) {
                console.error('An error occured during registration:', error);
            }
        },
    });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 400, margin: 'auto', marginTop: '25vh' }}>
    <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '3px solid #4500CC' }}>
        <Typography component="h1" variant="h1" sx={{ color: '#4500CC'}}>
            Registrace
        </Typography>
        <TextField
            variant="outlined"
            label="E-mail"
            id="email"
            name="email"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            label="Uživatelské jméno"
            id="username"
            name="username"
            fullWidth
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            type="password"
            label="Heslo"
            id="password"
            name="password"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            type="password"
            label="Potvrďte heslo"
            id="confirmPassword"
            name="confirmPassword"
            fullWidth
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            Registrovat se
        </Button>
    </Paper>
</Box>
  )
}
