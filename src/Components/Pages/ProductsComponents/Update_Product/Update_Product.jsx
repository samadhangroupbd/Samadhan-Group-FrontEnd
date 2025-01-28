import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import axios from "axios";

const Update_Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const adminData = location.state?.adminData || {};

  const [formData, setFormData] = useState({
    productName: adminData.productName || "",
    category: adminData.category || "",
    price: adminData.price || "",
    createDate: adminData.createDate || "",
    image: adminData.image || "",
  });

  const [imagePreview, setImagePreview] = useState(adminData.image || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input for image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setErrors({ ...errors, image: "File size exceeds 2MB" });
        setImagePreview(null);  // Clear preview on error
      } else if (!file.type.startsWith("image/")) { // Check if it's an image file
        setErrors({ ...errors, image: "Only image files are allowed" });
        setImagePreview(null);  // Clear preview on error
      } else {
        setErrors({ ...errors, image: "" });  // Clear error if valid image
        setImagePreview(URL.createObjectURL(file));
        setFormData((prevData) => ({
          ...prevData,
          image: file, // Store the file object for later upload
        }));
      }
    }
  };

  const handleImageUpload = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", imageFile);

      // Make a request to ImgBB to upload the image
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
        formDataToUpload
      );

      if (response.data.success) {
        return response.data.data.display_url;
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image to ImgBB.");
      return null;  // Return null if image upload fails
    }
  };

  const handleUpdate = async () => {
    // Basic validation for required fields
    if (!formData.productName || !formData.price) {
      setErrors({
        productName: !formData.productName ? "Product Name is required." : "",
        price: !formData.price ? "Price is required." : "",
      });
      return;
    }

    setLoading(true); // Set loading state

    try {
      let imageUrl = formData.image; // Default to the current image URL if no new image is selected

      // If a new image file is selected, upload it to ImgBB
      if (formData.image && formData.image instanceof File) {
        imageUrl = await handleImageUpload(formData.image); // Upload new image to ImgBB
        if (!imageUrl) {
          setLoading(false); // Stop loading state if image upload fails
          return; // Stop the update if image upload fails
        }
      }

      // Prepare form data for the update request
      const updateData = {
        productName: formData.productName,
        category: formData.category,
        price: formData.price,
        createDate: formData.createDate,
        image: imageUrl,
      };

      const response = await axios.put(`http://localhost:5000/product-update/${adminData._id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/dashboard/manage-product");
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full sm:w-full md:w-full lg:w-2/3 p-8 rounded-lg shadow-lg">
        <CardHeader floated={false} shadow={false} className="rounded-none text-center">
          <Typography variant="h5" className="font-semibold text-blue-600">
            Update Product Information
          </Typography>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Product Name"
            value={formData.productName}
            name="productName"
            onChange={handleInputChange}
            className={`mb-4 ${errors.productName ? "border-red-400" : ""}`}
            required
          />
          {errors.productName && <span className="text-xs text-red-400">{errors.productName}</span>}

          <Input
            label="Category"
            value={formData.category}
            name="category"
            onChange={handleInputChange}
            className="mb-4"
          />

          <Input
            label="Price"
            value={formData.price}
            name="price"
            onChange={handleInputChange}
            className={`mb-4 ${errors.price ? "border-red-400" : ""}`}
            required
          />
          {errors.price && <span className="text-xs text-red-400">{errors.price}</span>}

          {/* Image upload input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-2 w-full ${errors.image ? "border-red-400" : ""}`}
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover" />
              </div>
            )}
          </div>
          {errors.image && <span className="text-xs text-red-400">{errors.image}</span>}

          <Input
            label="Creation Date"
            value={formData.createDate}
            name="createDate"
            disabled
            className="mb-4"
          />
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleUpdate}
            className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 px-4 rounded-md transition duration-300`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Update_Product;
