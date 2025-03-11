import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit_Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const adminData = location.state?.adminData || {};

  // Initialize state for form data
  const [formData, setFormData] = useState({
    title: adminData.title || "",
    tags: adminData.tags || "",
    description: adminData.description || "",
    createDate: adminData.createDate || "",
  });

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the blog update request
  const handleUpdate = async () => {
    try {
      const updatedFormData = { ...formData }; // Ensure the formData is sent to the backend

      const response = await fetch(`http://localhost:5000/blog-update/${adminData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the blog.");
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate("/dashboard/manage-blog");
      } else {
        toast.success("Blog updated successfully!");
        navigate("/dashboard/manage-blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            Edit Blog Post
          </h1>
          
          <form className="space-y-6">
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              
            </div>

            <div>
              <label 
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="description"
                name="description"
                rows="8"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/manage-blog")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_Blog;
