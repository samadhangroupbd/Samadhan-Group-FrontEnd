import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import { Spinner } from "@material-tailwind/react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, userResponse] = await Promise.all([
          fetch("http://localhost:5000/product"),
          user?.email && fetch(`http://localhost:5000/signup?email=${user.email}`)
        ]);

        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();

        setProducts(productsData);
        setCategories(["All", ...new Set(productsData.map(p => p.category))]);

        if (user?.email && userResponse) {
          if (!userResponse.ok) throw new Error('Failed to fetch user data');
          const userData = await userResponse.json();
          setUserData(userData[0]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  const truncateDescription = (text, limit = 80) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const filteredProducts = products
    .filter(product => 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => 
      selectedCategory === "All" || product.category === selectedCategory
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-8 p-6 min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800">
          Explore Our Products
        </h1>
        <p className="text-gray-600 text-lg">
          Discover our curated collection of high-quality items
        </p>
      </div>

      {/* Filters Section */}
      <div className="w-full max-w-6xl space-y-4 md:space-y-0 md:flex md:gap-6 md:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
          />
        </div>

        <div className="flex-1">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-6 py-3 rounded-xl border-2 border-cyan-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">
          No products found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
          {filteredProducts.map(product => {
            const isApprovedUser = userData?.paymentApprove === "yes" || userData?.aproval === "approved";
            const displayPrice = isApprovedUser ? product.price : product.defaultPrice;

            return (
              <div 
                key={product._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.productName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-3xl" />
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                    <span className="text-xl font-bold text-cyan-700">
                      {displayPrice}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.productName}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {truncateDescription(product.description)}
                  </p>

                  {/* "View Details" Button */}
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
