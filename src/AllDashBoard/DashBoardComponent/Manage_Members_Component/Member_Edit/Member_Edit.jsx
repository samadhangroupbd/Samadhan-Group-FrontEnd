import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";

const Member_Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const adminData = location.state?.adminData || {};

    const [formData, setFormData] = useState({
        fullName: adminData.fullName || "",
        email: adminData.email || "",
        phoneNumber: adminData.phoneNumber || "",
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
        member: adminData.member || "",
        payment: adminData.payment || "",
        transactionId: adminData.transactionId || "",
        createDate: adminData.createDate || "",
        endDate: adminData.endDate || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        // Basic form validation (e.g., required fields)
        if (!formData.fullName || !formData.email) {
            alert("Full Name and Email are required.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/User-Admin/${adminData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update the Member.');
            }

            const data = await response.json();
            if (data.success) {
                alert("Member updated successfully!");
                navigate("/dashboard/manage-members");
            } else {
                alert(" Member updated successfully!.");
                navigate("/dashboard/manage-members");
            }
        } catch (error) {
            console.error("Error updating Member:", error);
            alert("An error occurred while updating the Member.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white w-full sm:w-full md:w-full lg:w-full p-8 rounded-lg shadow-lg">
                <Typography variant="h5" className="text-center font-semibold mb-6 text-blue-600">
                    Member Information Update
                </Typography>
                <form>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleInputChange}
                            className="mb-4"
                            required
                        />
                        <Input
                            label="Email"
                            value={formData.email}
                            disabled
                            name="email"
                            onChange={handleInputChange}
                            className="mb-4"
                            required
                        />
                        <Input
                            label="Phone Number"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Nationality"
                            value={formData.nationality}
                            name="nationality"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Gender"
                            value={formData.gender}
                            name="gender"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            name="dateOfBirth"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Blood Group"
                            value={formData.bloodGroup}
                            name="bloodGroup"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Reference Id"
                            value={formData.referenceId}
                            name="referenceId"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Country"
                            value={formData.country}
                            name="country"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Division"
                            value={formData.division}
                            name="division"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="District"
                            value={formData.district}
                            name="district"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Thana"
                            value={formData.thana}
                            name="thana"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Post Office"
                            value={formData.postOffice}
                            name="postOffice"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Village"
                            value={formData.village}
                            name="village"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Ward"
                            value={formData.ward}
                            name="ward"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Member"
                            value={formData.member}
                            name="member"
                            onChange={handleInputChange}
                            className="mb-4"
                        />

                        <Input
                            label="Payment"
                            value={formData.payment}
                            name="payment"
                            onChange={handleInputChange}
                            className="mb-4"
                        />

                        <Input
                            label="Transaction Id"
                            value={formData.transactionId}
                            name="transactionId"
                            onChange={handleInputChange}
                            className="mb-4"
                        />
                        <Input
                            label="Create Date"
                            value={formData.createDate}
                            name="createDate"
                            onChange={handleInputChange}
                            className="mb-4"
                            disabled
                        />

                        <Input
                            label="End Date"
                            value={formData.endDate}
                            name="endDate"
                            onChange={handleInputChange}
                            className="mb-4"
                        />



                    </div>
                    <Button
                        onClick={handleUpdate}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Update Member
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Member_Edit;
