import React, { useState } from 'react'
import { Product } from "./Product"
import { Sidebar} from "../../components/Sidebar"
import './shop.css'

export const Shop = ({PRODUCTS}) => {
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
    //console.log("Result:", result);
    //console.log(product.price);
    //console.log('priceFilter', priceFilter);
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
      <div className="product-container">
          <div className='product-grid'>
              {" "}
              {sortedProducts.map((product) => (
                  <Product data={product} key={product.id}/>
              ))}
          </div>
      </div>
    </div>
  );
};
