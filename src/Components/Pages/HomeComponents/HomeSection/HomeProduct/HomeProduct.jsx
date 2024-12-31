import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to truncate the description to a given number of words
const truncateDescription = (description, wordLimit = 15) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // To navigate to the details page

  // Fetch product data from JSON
  useEffect(() => {
    fetch("/product.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched product data:", data);
        setProducts(data.slice(0, 6)); // Get the first 6 products
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-5 min-h-screen bg-gray-100">
      {/* Title Section */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center pt-10">
        Our Products
      </h2>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out flex flex-col"
          >
            <img
              className="w-full h-48 object-cover rounded-t-2xl"
              src={product.productImage}
              alt={product.productName}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h5 className="text-2xl font-semibold text-gray-900 mb-2">
                {product.productName}
              </h5>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {truncateDescription(product.productDescription, 15)} {/* Truncated description */}
              </p>

              {/* Price and Button Section */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-semibold text-cyan-700">
                  ৳{product.productPrice}
                </span>
                <button
                  onClick={() => navigate(`/product/${product.id}`)} // Navigate to product detail page
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

export default HomeProduct;
