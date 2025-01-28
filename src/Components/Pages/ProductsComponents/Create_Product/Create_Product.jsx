import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // for displaying notifications

const Create_Product = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const categories = [
    "Electronics", "Smartphones", "Laptops", "Tablets", "TVs", "Headphones", "Wearable Technology (e.g., Smartwatches)", 
    "Cameras", "Fashion & Apparel", "Men’s Clothing", "Women’s Clothing", "Shoes", "Accessories (e.g., Bags, Hats, Scarves)", 
    "Jewelry", "Activewear", "Beauty & Personal Care", "Skincare", "Haircare", "Makeup", "Fragrances", "Health & Wellness Products", 
    "Grooming Tools", "Home & Living", "Furniture", "Home Decor", "Kitchen Appliances", "Bedding & Linens", "Lighting Fixtures", 
    "Rugs & Carpets", "Toys & Games", "Action Figures", "Board Games", "Dolls", "Puzzles", "Outdoor Play Equipment", 
    "Educational Toys", "Health & Fitness", "Supplements", "Exercise Equipment", "Apparel (e.g., Gym Clothes)", 
    "Sports Accessories", "Yoga & Meditation Gear", "Books & Media", "Fiction", "Non-Fiction", "Educational Books", 
    "E-books", "Magazines", "Music & Movies (CDs, DVDs)", "Food & Beverages", "Snacks", "Beverages (e.g., Soft Drinks, Juices)", 
    "Dairy Products", "Groceries", "Organic & Specialty Foods", "Automotive & Tools", "Car Parts & Accessories", 
    "Motorbikes & Accessories", "Tools & Equipment", "Car Care Products", "Electronics for Cars (e.g., GPS, Dashcams)", 
    "Office Supplies & Stationery", "Office Furniture", "Paper Products", "Writing Tools (Pens, Pencils)", 
    "Organizational Items (Binders, Files)", "Tech Accessories (Keyboards, Mice)", "Sports & Outdoors", "Camping & Hiking Gear", 
    "Bicycles & Accessories", "Outdoor Furniture", "Fishing & Hunting Gear", "Team Sports Equipment", "Pet Supplies", 
    "Pet Food & Treats", "Pet Toys", "Pet Grooming Products", "Pet Accessories (e.g., Leashes, Beds)", "Pet Health Products (e.g., Flea & Tick Solutions)", 
    "Baby Products", "Diapers & Wipes", "Baby Clothes", "Feeding & Nursing", "Baby Gear (Strollers, Car Seats)", 
    "Nursery Furniture", "Arts & Crafts", "Art Supplies (e.g., Paint, Brushes)", "Craft Materials (e.g., Paper, Yarn)", 
    "DIY Kits", "Sewing & Knitting", "Party Supplies", "Luxury Goods", "Designer Clothing & Accessories", "High-end Jewelry", 
    "Luxury Watches", "Premium Bags & Footwear", "Fine Wines & Spirits", "Technology & Software", "Software Applications", 
    "Web Development Tools", "Cloud Services", "Hardware (e.g., Servers, Routers)"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName) newErrors.productName = "Product Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image) {
      newErrors.image = "Image is required";
    } else if (!formData.image.type.startsWith("image/")) {
      newErrors.image = "File must be an image";
    }

    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "File size exceeds 2MB" });
        setImagePreview(null);
      } else if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Only image files are allowed" });
        setImagePreview(null);
      } else {
        setErrors({ ...errors, image: "" });
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Only allow numeric values
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, price: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        setErrors({ ...errors, general: "" });

        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        const imageResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
          imageFormData
        );
        const imageUrl = imageResponse.data.data.display_url;

        const currentDateTime = new Date();
        const createDate = currentDateTime.toLocaleDateString();
        const createTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        const productData = {
          productName: formData.productName,
          description: formData.description,
          price: `${formData.price}৳`, // Add the symbol after the price
          category: formData.category,
          image: imageUrl,
          createDate,
          createTime
        };

        const response = await axios.post("http://localhost:5000/product", productData);

        if (response.data.success) {
          toast.success("Product created successfully!");
          navigate("/products");
        }

        setLoading(false);
        e.target.reset();
        setImagePreview(null);
      } catch (error) {
        setLoading(false);
        setErrors({ ...errors, general: error.message });
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6 h-screen">
        <div className="space-y-2">
          <label htmlFor="productName" className="block text-lg font-medium text-gray-700">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.productName && <span className="text-sm text-red-500">{errors.productName}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.image && <span className="text-sm text-red-500">{errors.image}</span>}
        </div>

        {imagePreview && (
          <div className="text-center mt-4">
            <img src={imagePreview} alt="Image Preview" className="w-48 h-48 object-cover mx-auto" />
          </div>
        )}

        {errors.general && <div className="text-sm text-red-500 text-center">{errors.general}</div>}

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_Product;
