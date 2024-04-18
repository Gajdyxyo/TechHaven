import React from 'react'
import { TextField, Button, Box, Paper} from '@mui/material'
import { useFormik } from 'formik/dist'

export const AddProduct = () => {
    const formik = useFormik({
        initialValues: {
            productName: '',
            productImage: '',
            productPrice: '',
            productCat: '',
            prductMak: '',
            shortDesc: '',
            description: '',
            instock: '',
        },
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const response = await fetch('http://localhost/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productName: values.productName, 
                        productPrice: values.productPrice,
                        productImage: values.productImage,
                        productCat: parseInt(values.productCat),
                        productMak: parseInt(values.productMak),
                        shortDesc: values.shortDesc,
                        description: values.description,
                        instock: parseInt(values.instock),
                        action: 'addProduct',
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
            if (!values.productCat) {
                errors.productCat = 'ID Kategorie je povinná';
            } else if (isNaN(values.productCat)) {
                errors.productCat = 'ID Kategorie musí být číslo';
            }
            if (!values.productMak) {
                errors.productMak = 'ID Výrobce je povinný';
            } else if (isNaN(values.productMak)) {
                errors.productMak = 'ID Výrobce musí být číslo';
            }
            if (!values.instock) {
                errors.instock = 'Počet kusů je povinný';
            } else if (isNaN(values.productMak)) {
                errors.instock = 'Počet kusů musí být číslo';
            }
            if (!values.shortDesc) {
                errors.shortDesc = 'Krátký popis je povinný';
            } else if (values.shortDesc.length > 100) {
                errors.shortDesc = 'Maximální délka krátkého popisu je 100 znaků';
            }
            if (!values.description) {
                errors.description = 'Popis je povinný';
            } else if (values.description.length > 500) {
                errors.description = 'Maximální délka popisu je 500 znaků';
            }
            if (!values.productImage) {
                errors.productImage = 'URL obrázku je povinný';
            }
            return errors;
        }
    });
    
    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                maxWidth: '80vw',
                margin: 'auto',
                marginTop: '5vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper elevation={3} sx={{ padding: '20px', outline: '3px solid #4500CC' }}>
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
                />
                <TextField
                    variant="outlined"
                    label="Kategorie (ID)"
                    id="productCat"
                    name="productCat"
                    fullWidth
                    margin="normal"
                    value={formik.values.productCat}
                    onChange={formik.handleChange}
                    error={formik.touched.productCat && Boolean(formik.errors.productCat)}
                    helperText={formik.touched.productCat && formik.errors.productCat}
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
                />
                <TextField
                    variant="outlined"
                    label="Výrobce (ID)"
                    id="productMak"
                    name="productMak"
                    fullWidth
                    margin="normal"
                    value={formik.values.productMak}
                    onChange={formik.handleChange}
                    error={formik.touched.productMak && Boolean(formik.errors.productMak)}
                    helperText={formik.touched.productMak && formik.errors.productMak}
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
                />
                <TextField
                    variant="outlined"
                    label="Počet kusů na skladě"
                    id="instock"
                    name="instock"
                    fullWidth
                    margin="normal"
                    value={formik.values.instock}
                    onChange={formik.handleChange}
                    error={formik.touched.instock && Boolean(formik.errors.instock)}
                    helperText={formik.touched.instock && formik.errors.instock}
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
                />
                <TextField
                    variant="outlined"
                    label="Krátký popis"
                    id="shortDesc"
                    name="shortDesc"
                    fullWidth
                    margin="normal"
                    value={formik.values.shortDesc}
                    onChange={formik.handleChange}
                    error={formik.touched.shortDesc && Boolean(formik.errors.shortDesc)}
                    helperText={formik.touched.shortDesc && formik.errors.shortDesc}
                    multiline
                    rows={4}
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
                />
                <TextField
                    variant="outlined"
                    label="Popis"
                    id="description"
                    name="description"
                    fullWidth
                    margin="normal"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    multiline
                    rows={4}
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
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        textDecoration: 'none',
                        backgroundColor: '#4500CC',
                        color: '#FFFFFF',
                        border: '1px solid #4500CC',
                        marginTop: '1vh',
                        '&:hover': { backgroundColor: '#FFFFFF', color: '#4500CC', border: '1px solid #4500CC' },
                    }}
                >
                    Přidat
                </Button>
            </Paper>
        </Box>
    );
};

