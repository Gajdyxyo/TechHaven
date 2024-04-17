import React, { useState } from 'react'
import {TextField, Button, Box, Typography, Paper} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Profile = ({ userId }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const formik = useFormik({
        initialValues: {
            newEmail: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newEmail: Yup.string().email('Nesprávný e-mail adresa').required('Vyplňte'),
            oldPassword: Yup.string().required('Required'),
            newPassword: Yup.string().min(6, 'Heslo musí mít minimálně 6 znaků.').max(20, 'Maximálně 20 znaků').required('Vyplňte'),
            confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Hesla se neshodují').required('Vyplňte'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost/updateProfile.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        newEmail: values.newEmail,
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                        action: 'update_profile',
                    }),
                });
        
                if (response.ok) {
                    console.log('Change successful - React');
                    setSuccessMessage('Změny provedeny úspěšně!');
                    setErrorMessage('');
                } else if (!response.ok) {
                    console.log('Change failed - React');
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
            Změna údajů
        </Typography>
        <TextField
        variant="outlined"
        label="Nový Email"
        id="newEmail"
        name="newEmail"
        fullWidth
        margin="normal"
        value={formik.values.newEmail}
        onChange={formik.handleChange}
        error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
        helperText={formik.touched.newEmail && formik.errors.newEmail}
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
            label="Staré heslo"
            id="oldPassword"
            name="oldPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
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
            label="Nové Heslo"
            id="newPassword"
            name="newPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
            label="Heslo znovu"
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
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
