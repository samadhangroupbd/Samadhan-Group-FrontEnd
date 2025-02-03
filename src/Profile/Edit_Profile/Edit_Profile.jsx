import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";

const Edit_Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const adminData = location.state?.adminData || {};

    const [formData, setFormData] = useState({
        fullName: adminData.fullName || "",
        email: adminData.email || "",
        phoneNumber: adminData.phoneNumber || "",
        nationality: adminData.nationality || "",
        image: adminData.image || null,
        nidBirthImage: adminData.nidBirthImage || null,
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
        member: adminData.member || "",
        payment: adminData.payment || "",
        transactionId: adminData.transactionId || "",
        createDate: adminData.createDate || "",
        endDate: adminData.endDate || "",
        profileId: adminData.profileId || "",
        membershipType: adminData.membershipType || "",
        membershipCost: adminData.membershipCost || "",
        paymentPhoto: adminData.paymentPhoto || null,
    });

    const [errors, setErrors] = useState({});
    const [NIDPhotoPreview, setNIDPhotoPreview] = useState(null);
    const [ProfilePreview, setProfilePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            return updatedData;
        });
    };

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, image: "File size exceeds 2MB" });
                setProfilePreview(null);
            } else if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, image: "Only image files are allowed" });
                setProfilePreview(null);
            } else {
                setErrors({ ...errors, image: "" });
                setProfilePreview(URL.createObjectURL(file));
                setFormData((prevData) => ({
                    ...prevData,
                    image: file,
                }));
            }
        }
    };

    const handleNIDPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, nidBirthImage: "File size exceeds 2MB" });
                setNIDPhotoPreview(null);
            } else if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, nidBirthImage: "Only image files are allowed" });
                setNIDPhotoPreview(null);
            } else {
                setErrors({ ...errors, nidBirthImage: "" });
                setNIDPhotoPreview(URL.createObjectURL(file));
                setFormData((prevData) => ({
                    ...prevData,
                    nidBirthImage: file,
                }));
            }
        }
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!formData.payment) {
            validationErrors.payment = "Payment method is required.";
        }
        if (!formData.transactionId) {
            validationErrors.transactionId = "Transaction ID is required.";
        }
        if (!formData.membershipType) {
            validationErrors.membershipType = "Membership type is required.";
        }
        if (!formData.membershipCost) {
            validationErrors.membershipCost = "Membership cost is required.";
        }
        if (!formData.endDate) {
            validationErrors.endDate = "End date is required.";
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // If there's a payment photo, upload it
            let NIDPhotoUrl = formData.nidBirthImage;
            let ProfilePhotoUrl = formData.image;

            // Handle Profile Image upload
            if (formData.image && typeof formData.image !== "string") {
                const paymentPhotoFormData = new FormData();
                paymentPhotoFormData.append("image", formData.image);
                const paymentPhotoResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
                    paymentPhotoFormData
                );

                if (paymentPhotoResponse.status !== 200) {
                    throw new Error("Error uploading Profile Image");
                }

                ProfilePhotoUrl = paymentPhotoResponse.data.data.display_url;
            }

            // Handle NID Image upload
            if (formData.nidBirthImage && typeof formData.nidBirthImage !== "string") {
                const NIDPhotoFormData = new FormData();
                NIDPhotoFormData.append("image", formData.nidBirthImage);
                const NIDPhotoResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
                    NIDPhotoFormData
                );

                if (NIDPhotoResponse.status !== 200) {
                    throw new Error("Error uploading NID Image");
                }

                NIDPhotoUrl = NIDPhotoResponse.data.data.display_url;
            }

            const updatedData = { ...formData, nidBirthImage: NIDPhotoUrl, image: ProfilePhotoUrl };

            const response = await fetch(`http://localhost:5000/User-Admin/${adminData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const data = await response.json();
            if (data.success) {
                alert("Successfully updated!");
                navigate("/edit-profile");
            } else {
                alert("Please wait until it gets approved!");
                navigate("/edit-profile");
            }
        } catch (error) {
            console.error("Error updating Member:", error);
            alert("Error while updating the profile, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6">
            <div className="bg-white my-20 w-full sm:w-3/4 lg:w-3/4 xl:w-3/4 p-8 rounded-lg shadow-xl">
                <Typography variant="h5" className="text-center font-semibold mb-6 text-indigo-700">
                    Update Profile
                </Typography>
                <form onSubmit={handleUpdate} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="block text-sm text-gray-800">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-400 bg-gray-50`}
                        />
                        {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block text-sm text-gray-800">Mobile Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-md ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-400 bg-gray-50`}
                        />
                        {errors.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber}</span>}
                    </div>

                    {/* Profile Image */}
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm text-gray-800">Profile Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleProfilePhotoChange}
                            className={`w-full px-4 py-2 rounded-md ${errors.image ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-400 bg-gray-50`}
                        />
                        {errors.image && <span className="text-xs text-red-500">{errors.image}</span>}
                        {ProfilePreview && (
                            <div className="mt-2">
                                <img src={ProfilePreview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>

                    {/* NID Image */}
                    <div className="space-y-2">
                        <label htmlFor="nidBirthImage" className="block text-sm text-gray-800">NID Image</label>
                        <input
                            type="file"
                            id="nidBirthImage"
                            name="nidBirthImage"
                            accept="image/*"
                            onChange={handleNIDPhotoChange}
                            className={`w-full px-4 py-2 rounded-md ${errors.nidBirthImage ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-400 bg-gray-50`}
                        />
                        {errors.nidBirthImage && <span className="text-xs text-red-500">{errors.nidBirthImage}</span>}
                        {NIDPhotoPreview && (
                            <div className="mt-2">
                                <img src={NIDPhotoPreview} alt="NID Preview" className="w-24 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Update..." : "Update Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Edit_Profile;
