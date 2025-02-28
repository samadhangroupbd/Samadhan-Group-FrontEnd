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
    <div className="mt-16 flex flex-col items-center gap-10 p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-5xl">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 p-1 rounded-2xl">
          <h1 className="text-5xl md:text-4xl font-bold text-white px-8 py-4 rounded-xl shadow-2xl bg-gradient-to-r from-blue-500 to-indigo-600">
            Explore Our Products
          </h1>
        </div>
        <p className="text-gray-600 text-xl font-light italic">
          Discover our curated collection of exceptional quality items
        </p>
      </div>

      {/* Filters Section */}
      <div className="w-full max-w-7xl space-y-6 md:space-y-0 md:flex md:gap-8 md:items-center">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search luxury items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-blue-100 bg-white focus:border-blue-300 focus:ring-4 ring-blue-50 ring-opacity-50 shadow-sm transition-all duration-300 text-gray-700 placeholder-blue-300 font-medium"
          />
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-blue-100 bg-white focus:border-blue-300 focus:ring-4 ring-blue-50 ring-opacity-50 shadow-sm appearance-none transition-all duration-300 text-gray-700 font-medium"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-gray-500">
          <svg className="w-24 h-24 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-2xl font-light text-gray-400">No matching items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-7xl">
          {filteredProducts.map(product => {
            const isApprovedUser = userData?.paymentApprove === "yes" || userData?.aproval === "approved";
            const displayPrice = isApprovedUser ? product.price : product.defaultPrice;

            return (
              <div
                key={product._id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-72 w-full overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl z-10" />
                  <img
                    src={product.image}
                    alt={product.productName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full text-sm font-semibold shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      {truncateDescription(product.description)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-blue-50 pt-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {displayPrice}
                    </span>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <span>Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
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
