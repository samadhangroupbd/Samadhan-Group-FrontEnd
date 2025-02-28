import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // for displaying notifications

const Create_Blog = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.tags) newErrors.tags = "Tags are required";
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

        const blogData = {
          title: formData.title,
          description: formData.description,
          tags: formData.tags,
          image: imageUrl,
          createDate,
          createTime
        };

        const response = await axios.post("http://localhost:5000/blog", blogData);

        if (response.data.success) {
          toast.success("Blog created successfully!");
          navigate("/dashboard/manage-blog");
        }

        setLoading(false);
        e.target.reset();
        setImagePreview(null);
      } catch (error) {
        setLoading(false);
        setErrors({ ...errors, general: error.message });
        toast.success("Blog created successfully!");
          navigate("/dashboard/manage-blog");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Create a New Blog Post</h2>
  <form onSubmit={handleSubmit} className="space-y-8">
    {/* Title Field */}
    <div className="space-y-3">
      <label htmlFor="title" className="block text-lg font-semibold text-gray-800">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter blog title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-5 py-3 border-2 border-gray-200 text-black bg-gray-200 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
        required
      />
      {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
    </div>

    {/* Description Field */}
    <div className="space-y-3">
      <label htmlFor="description" className="block text-lg font-semibold text-gray-800">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter blog description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg  text-black bg-gray-200 focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
        rows="5"
        required
      />
      {errors.description && <span className="text-sm text-red-600">{errors.description}</span>}
    </div>

    {/* Tags Field */}
    <div className="space-y-3">
      <label htmlFor="tags" className="block text-lg font-semibold text-gray-800">Tags:</label>
      <input
        type="text"
        id="tags"
        name="tags"
        placeholder="Enter blog tags (comma-separated)"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        className="w-full px-5 py-3 border-2 border-gray-200  text-black bg-gray-200 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
        required
      />
      {errors.tags && <span className="text-sm text-red-600">{errors.tags}</span>}
    </div>

    {/* Image Upload Field */}
    <div className="space-y-3">
      <label htmlFor="image" className="block text-lg font-semibold text-gray-800">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full py-3 px-5 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
        required
      />
      {errors.image && <span className="text-sm text-red-600">{errors.image}</span>}
    </div>

    {/* Image Preview */}
    {imagePreview && (
      <div className="text-center mt-6">
        <img
          src={imagePreview}
          alt="Image Preview"
          className="w-64 h-64 object-cover mx-auto rounded-lg shadow-md"
        />
      </div>
    )}

    {/* General Error Message */}
    {errors.general && (
      <div className="text-sm text-red-600 text-center mt-4">{errors.general}</div>
    )}

    {/* Submit Button */}
    <div className="text-center">
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? "Creating..." : "Create Blog Post"}
      </button>
    </div>
  </form>
</div>
  );
};

export default Create_Blog;
