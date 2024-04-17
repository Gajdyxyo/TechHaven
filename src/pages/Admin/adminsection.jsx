import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button } from "@mui/material"
import { Sidebar } from '../../components/Sidebar'
import './adminsection.css'

export const AdminSection = ({ PRODUCTS }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log(id);
        if (id) {
            navigate(`/AdminSection/${id}`, { state: { productId: id, product: PRODUCTS.find(product => product.id === id) } });
        } else {
            console.error('Invalid product ID');
        }
    }

    const maxPrice = Math.max(...PRODUCTS.map(product => product.price));
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredMakers, setFilteredMakers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState(maxPrice);
    const [sortOption, setSortOption] = useState('default');
    const filteredProducts = PRODUCTS.filter(product => {
      const searchQueryLowerCase = searchQuery.toLowerCase().trim();
      if (!product || !product.productName) {
        return false;
      }
      const categoryFilter = filteredCategories.length === 0 || filteredCategories.includes(product.categoryName);
      const makerFilter = filteredMakers.length === 0 || filteredMakers.includes(product.makerName);
      const productNameLowerCase = product.productName.toLowerCase().trim();
      const searchWords = searchQueryLowerCase.split(" ").filter(word => word);
      const searchFilter = searchWords.every(word => productNameLowerCase.includes(word));
      const priceFilterCondition = product.price <= priceFilter; // Check if product price is less than or equal to priceFilter
      const result = categoryFilter && makerFilter && searchFilter && priceFilterCondition;
      console.log("Result:", result);
      console.log(product.price);
      console.log('priceFilter', priceFilter);
      return result;
    });
    
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case 'alphabeticalAsc':
          return a.productName.localeCompare(b.productName);
        case 'alphabeticalDesc':
          return b.productName.localeCompare(a.productName);
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  

    return (
        <div>
            <Sidebar products={PRODUCTS} setFilteredCategories={setFilteredCategories} setFilteredMakers={setFilteredMakers} setSearchQuery={setSearchQuery} setPriceFilter={setPriceFilter} setSortOption={setSortOption}/>
            <div className="productContainer">
                <div className='productGrid'>
                    {sortedProducts.map((p) => (
                        <Card key={p.id} className="productCard" sx={{backgroundColor: '#4500CC', color:'#FFFFFF', position: 'relative', width: '18vw', height: '70vh', borderRadius: '2%', border: '5px solid #4500CC'}}>
                            <img
                                src={p.productImage}
                                alt={p.productName}
                                className="productImage"
                                style={{ display: 'block', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: '1.5%', marginTop: '0.5px'}}
                                onError={(e) => console.error("Image failed to load")}
                            />
                            <CardContent sx={{ marginBottom: '64px'}}>
                                <Typography gutterBottom variant="h2">
                                    {p.productName}
                                </Typography>
                                <Typography variant="body3" sx={{position: 'absolute', left: 10, bottom: 40, color: 'red', fontWeight: '500', background: '#FFFFFF', padding: '5px', border: '2px solid red'}}>
                                    {p.price} Kč
                                </Typography>
                                <Button variant= "contained" onClick={() => handleClick(p.id)} sx={{textTransform: 'none', textDecoration: 'none', color: '#4500CC', backgroundColor: '#FFFFFF', border: '3px solid #FFFFFF', position: 'absolute', right: 5, bottom: 5, '&:hover':{ backgroundColor: 'red', color: '#FFFFFF', border: '3px solid red'}}}>
                                    Upravit
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
