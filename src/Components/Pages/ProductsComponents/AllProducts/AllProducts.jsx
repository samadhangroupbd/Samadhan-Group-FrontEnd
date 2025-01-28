import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to truncate the description to a given number of characters
const truncateDescription = (description, charLimit = 40) => {
  if (description.length <= charLimit) {
    return description;
  }
  return description.slice(0, charLimit) + "...";
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  // Filter products based on search query and selected category
  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => {
      if (selectedCategory === "All") return true;
      return product.category === selectedCategory;
    });

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-10 flex-col items-center gap-8 p-6 min-h-screen bg-gradient-to-br from-cyan-100 to-blue-50">
      {/* Title Section */}
      <h2 className="text-4xl mt-10 font-bold mb-8 text-gray-800 text-center drop-shadow-md">
        Our Products
      </h2>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-6 w-full mb-8 justify-between items-center">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300 ease-in-out placeholder:text-gray-400"
          />
        </div>

        <div className="w-full sm:w-1/3 md:w-1/4">
          <select
            className="w-full p-4 rounded-lg border-2 border-cyan-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300 ease-in-out"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="max-w-sm rounded-lg overflow-hidden bg-white shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-60">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                src={product.image}
                alt={product.productName}
              />
            </div>
            <div className="p-6 flex flex-col">
              <h5 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-cyan-700 transition duration-300">
                {product.productName}
              </h5>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {truncateDescription(product.description, 50)} {/* 50 character truncation */}
              </p>

              {/* Price and Button Section */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-semibold text-cyan-700">
                  {product.price}
                </span>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="inline-block rounded-lg bg-cyan-700 px-6 py-2 text-white text-sm font-medium hover:bg-cyan-800 transition-all duration-200 ease-in-out"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
