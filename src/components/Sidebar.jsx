import React, {useState, useEffect} from 'react'
import { Box, Paper, InputBase, Button, FormGroup, FormControlLabel, Checkbox, Slider, Typography, Select, MenuItem } from '@mui/material'
import { MagnifyingGlass, CaretDown } from "phosphor-react"
import './sidebar.css'

export const Sidebar = ({ products, setFilteredCategories, setFilteredMakers, setSearchQuery, setPriceFilter, setSortOption}) => {
    const maxPrice = Math.max(...products.map(product => product.price));
    const [sliderValue, setSliderValue] = useState(maxPrice);
    const [sortOption, setSortOptionLocal] = useState('default');

    const handleSortChange = (event) => {
        const newSortOption = event.target.value;
        setSortOptionLocal(newSortOption); // Update local state
        setSortOption(newSortOption); // Call the setter function passed from Shop
      }

    useEffect(() => {
        setSliderValue(maxPrice);
    }, [maxPrice]);

    //viditelnost kategorii, vyrobcu atd...
    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleMaker, setIsVisibleMaker] = useState(false);
    const toggleMakerVisibility = () => {
        setIsVisibleMaker(!isVisibleMaker);
    }

    const toggleCategoryVisibility = () => {
        setIsVisibleCategory(!isVisibleCategory);
    }
    
    ///////
    
    // filtrovani kategorii, vyrobcu atd...
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMakers, setSelectedMakers] = useState([]);

    const handleCategoryChange = (category) => {
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newSelectedCategories);
        setFilteredCategories(newSelectedCategories); // Pass selected categories to parent component
    }
    
    const handleMakerChange = (maker) => {
        const newSelectedMakers = selectedMakers.includes(maker)
            ? selectedMakers.filter (mak => mak !== maker)
            : [...selectedMakers, maker];
        setSelectedMakers(newSelectedMakers);
        setFilteredMakers(newSelectedMakers);
    }

    const handlePriceChange = (event, newValue) => {
        setSliderValue(newValue);
        setPriceFilter(newValue);
        console.log(sliderValue);
    }

    //mapovani kategorii, vyrobcu, atd...
    const uniqueCategoryNames = [...new Set(products.map(product => product.categoryName))];
    const uniqueMakerNames = [...new Set(products.map(product => product.makerName))];

    //search query
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    }
    return (
        <Paper sx={{ position: 'fixed', left: 10, top: '15vh', width: '15vw', maxHeight: '85vh', overflowY: 'auto', backgroundColor: '#FFFFFF', padding: '16px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: '3px solid #4500CC', '@media (max-width: 1080px)': {width: '13vw'}}}>
          <div style={{display: 'flex', alignItems: 'center', border: '2px solid #4500CC', borderRadius: '4px', padding: '8px', backgroundColor: '#FFFFFF', color: '#4500CC'}}>
            <InputBase placeholder="Hledat..." onChange={handleSearchChange} sx={{ marginRight: '8px',color: '#4500CC'}}/>
            <MagnifyingGlass style={{ marginRight: '8px' }} weight='bold' size={18}/>
          </div>
            <Box sx={{ marginTop: '16px' }}>
                <Button fullWidth onClick={toggleCategoryVisibility} sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',textDecoration: 'none',backgroundColor: '#4500CC',color: '#FFFFFF',border: '3px solid #4500CC','&:hover': {backgroundColor: '#FFFFFF',color: '#4500CC',border: '3px solid #4500CC',}}}>
                    <span style={{ flexGrow: 1}}>Kategorie</span>
                    <CaretDown />
                </Button>
                    <Box sx={{ flexGrow: 1 }} />
                        {isVisibleCategory && (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {uniqueCategoryNames.map(categoryName => (
                                    <FormGroup key={categoryName}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCategories.includes(categoryName)}
                                                    onChange={() => handleCategoryChange(categoryName)}
                                                    color="primary"
                                                />
                                            }
                                            label={categoryName}
                                        />
                                    </FormGroup>
                                ))}
                    </Box>
                        )}
            </Box>
            <Box sx={{ marginTop: '16px' }}>
                <Button fullWidth onClick={toggleMakerVisibility} sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',textDecoration: 'none',backgroundColor: '#4500CC',color: '#FFFFFF',border: '3px solid #4500CC','&:hover': {backgroundColor: '#FFFFFF',color: '#4500CC',border: '3px solid #4500CC',}}}>
                    <span style={{ flexGrow: 1}}>Výrobci</span>
                    <CaretDown />
                </Button>
            <Box sx={{ flexGrow: 1 }} />
                {isVisibleMaker && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {uniqueMakerNames.map(makerName => (
                            <FormGroup key={makerName}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedMakers.includes(makerName)}
                                            onChange={() => handleMakerChange(makerName)}
                                            color="primary"
                                        />
                                    }
                                    label={makerName}
                                />
                            </FormGroup>
                                ))}
                    </Box>
                )}
                <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
                    <Typography id="price-slider" gutterBottom>
                        Cena: {sliderValue} Kč
                    </Typography>
                    <Slider
                        value={sliderValue}
                        onChange={handlePriceChange}
                        aria-labelledby="price-slider"
                        min={0}
                        max={maxPrice}
                        sx={{ width: '80%' }}
                    />
                </Box>
                <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
                    <Typography gutterBottom>
                        Filtrovat podle:
                    </Typography>
                    <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    sx={{ width: '80%', backgroundColor: '#4500CC', color: '#FFFFFF'}}
                    displayEmpty
                    >
                        <MenuItem value="alphabeticalAsc">Abecedně (A-Z)</MenuItem>
                        <MenuItem value="alphabeticalDesc" >Abecedně (Z-A)</MenuItem>
                        <MenuItem value="priceAsc">Nejlevnější</MenuItem>
                        <MenuItem value="priceDesc">Nejdražší</MenuItem>
                    </Select>
                </Box>
            </Box>
        </Paper>
      );
}
