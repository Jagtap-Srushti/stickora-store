import React, { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import Dropdown from './Dropdown'
import SearchBox from './SearchBox'

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

const ProductListing = ({ products }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    let filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredProducts.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
        default:
          return parseInt(b.popularity) - parseInt(a.popularity);
      }
    });
  }, [products, searchText, selectedSort]);

  function handleSearchChange(inputSearch) {
    setSearchText(inputSearch);
  }

  function handleSortChange(sortType) {
    setSelectedSort(sortType);
  }

  return (
    <div className="max-w-[1152px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-10 pb-6 border-b border-light/60 dark:border-gray-700/60">
        <div className="w-full sm:max-w-md">
          <SearchBox
            label="Search"
            placeholder="Search products..."
            value={searchText}
            handleSearch={(value) => handleSearchChange(value)}
          />
        </div>
        <div className="w-full sm:w-auto flex justify-end">
          <Dropdown
            label="Sort by"
            options={sortList}
            value={selectedSort}
            handleSort={(value) => handleSortChange(value)}
          />
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 py-12">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4">
          <div className="w-16 h-16 bg-lighter dark:bg-darkbg/50 border border-light/60 dark:border-gray-700/60 rounded-2xl flex items-center justify-center text-primary dark:text-light mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-800 dark:text-lighter tracking-tight mb-1">
            No products found
          </h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
            We couldn't find matches for "{searchText}". Try checking your spelling or searching another keyword.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductListing;