import React from 'react'
import {TextField, Button, Typography, Paper, Box, FormControlLabel, Checkbox} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Nesprávná E-mailová adresa').required('Prosím vyplňte'),
            password: Yup.string().min(6, 'Heslo musí mít minimálně 6 znaků.').max(20, 'Maximálně 20 znaků').required('Vyplňte'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await fetch('http://localhost/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email, 
                        password: values.password,
                        rememberMe: values.rememberMe,
                        action: 'login',
                    }),
                });
        
                const data = await response.json();
                
                if (response.ok) {
                    setIsLoggedIn(true);
                    localStorage.setItem('userID', data.user.id);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('isAdmin', data.user.isAdmin);
                    const isAdmin = localStorage.getItem('isAdmin');
                    console.log('Login Successful! UserID:', localStorage.getItem('userID') ,", Username:", localStorage.getItem('username'), " isAdmin:", localStorage.getItem('isAdmin'));
                    if(isAdmin === 0) {
                        navigate('/');
                    }
                    else if(isAdmin === 1){
                        navigate('/AdminSection');
                    }
                } else {
                    console.error("Authentication Failed:", data.error);
                    setErrors({ password: 'Invalid e-mail or password' });
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 400, margin: 'auto', marginTop: '30vh'}}>
            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', outline: '3px solid #4500CC' }}>
                <Typography component="h1" variant="h1" sx={{ color: '#4500CC'}}>
                    Přihlášení
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
                <FormControlLabel control={<Checkbox />} label='Zapamatovat si mě'/>
                <Button type="submit" variant="contained" sx={{ textDecoration: 'none', backgroundColor: '#4500CC', color: '#FFFFFF',border: '1px solid #4500CC', '&:hover':{backgroundColor: '#FFFFFF', color: '#4500CC', border: '1px solid #4500CC'},}}>
                    Přihlásit se
                </Button>
            </Paper>
        </Box>
    );
}
