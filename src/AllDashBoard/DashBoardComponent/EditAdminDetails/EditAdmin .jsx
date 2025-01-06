import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation and useNavigate from react-router-dom
import { Button, Input, Typography } from "@material-tailwind/react"; // Tailwind components

const EditAdmin = () => {
  const location = useLocation(); // Access passed data from the Link
  const navigate = useNavigate(); // To redirect after update
  const adminData = location.state?.adminData || {}; // Get the data passed via the state, with fallback to empty object

  // Initialize the form data with adminData

  const [formData, setFormData] = useState({
    fullName: adminData.fullName || "",
    email: adminData.email || "",
    phoneNumber: adminData.phoneNumber || "", // Make sure to add default value
    // Add other fields with default empty string if they're not present in adminData
    nationality: adminData.nationality || "",
    fatherName: adminData.fatherName || "",
    motherName: adminData.motherName || "",
    nidNumber: adminData.nidNumber || "",
    gender: adminData.gender || "",
    dateOfBirth: adminData.dateOfBirth || "",
    bloodGroup: adminData.bloodGroup || "",
    referenceId: adminData.referenceId || "",
    country: adminData.country || "",
    division: adminData.division || "",
    district: adminData.district || "",
    thana: adminData.thana || "",
    postOffice: adminData.postOffice || "",
    village: adminData.village || "",
    ward: adminData.ward || "",
    nidBirthImage: adminData.nidBirthImage || "",
    member: adminData.member || "",
    payment: adminData.payment || "",
    transactionId: adminData.transactionId || "",
    paymentPhoto: adminData.paymentPhoto || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/User-Admin/${adminData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        
        alert("Admin updated successfully!");
        navigate("/dashboard/manage-admin"); // Navigate back after success
        
      } else {
        alert("Admin updated successfully!");
        navigate("/dashboard/manage-admin"); // Navigate back after success
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("An error occurred while updating the admin.");
    }
  };

  return (
    <div className="p-8">
      <Typography variant="h5">Edit Admin</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Full Name"
          value={formData.fullName}
          name="fullName"
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          label="Email"
          value={formData.email}
          name="email"
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          label="Phone Number"
          value={formData.phoneNumber}
          name="phoneNumber"
          onChange={handleInputChange}
          className="mb-4"
        />
        {/* Add more input fields for other properties as necessary */}
        <Button onClick={handleUpdate} className="mt-4">
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditAdmin;
