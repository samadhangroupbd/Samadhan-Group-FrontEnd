import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HomeProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Fetch product data from API based on the product ID
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data); // Assuming the data is the product object
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Loading state for product details
  }

  return (
    <div className="p-10">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="inline-block mt-24 rounded-lg bg-gray-700 text-white px-4 py-2 mb-6"
      >
        &larr; Back
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Image Section */}
        <img
          src={product.image} // Dynamic image URL from the product data
          alt={product.productName}
          className="w-full lg:w-1/2 h-64 object-cover mb-4 lg:mb-0 lg:mr-6 rounded-2xl"
        />

        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-900">{product.productName}</h2>
          <p className="text-lg text-gray-700 mb-4 text-justify">{product.description}</p>
          <span className="text-xl font-semibold text-cyan-700">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeProductDetail;
