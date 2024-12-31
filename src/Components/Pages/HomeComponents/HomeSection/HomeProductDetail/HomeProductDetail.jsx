import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HomeProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Fetch product data from JSON based on the product ID
  useEffect(() => {
    fetch("/product.json")
      .then((response) => response.json())
      .then((data) => {
        const productDetails = data.find((item) => item.id === parseInt(id)); // Find product by ID
        setProduct(productDetails);
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
      
      <h2 className="text-4xl font-bold text-gray-900">{product.productName}</h2>
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-64 object-cover mt-6 mb-4"
      />
      <p className="text-lg text-gray-700 mb-4 text-justify">{product.productDescription}</p>
      <span className="text-xl font-semibold text-cyan-700">
        ৳{product.productPrice}
      </span>
    </div>
  );
};

export default HomeProductDetail;
