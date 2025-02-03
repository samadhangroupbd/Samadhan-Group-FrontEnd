import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography, Select, Option } from "@material-tailwind/react";

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
        nidBirthImage: adminData.nidBirthImage || "",
        member: adminData.member || "",
        payment: adminData.payment || "",
        transactionId: adminData.transactionId || "",
        paymentPhoto: adminData.paymentPhoto || "",
        profileId: adminData.profileId || "",
        createDate: adminData.createDate || "",
        createTime: adminData.createTime || "",
        endDate: adminData.endDate || "",
        membershipType: adminData.membershipType || "",
        membershipCost: adminData.membershipCost || "",
    });

    const handleInputChange = (e) => {
        // If event target exists (for inputs)
        const target = e.target || e;  // If e.target is undefined, fallback to e itself

        // Ensure e.target (or e) has the necessary structure
        if (target && target.name && target.value !== undefined) {
            const { name, value } = target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
                alert("Member updated successfully!");
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
                <form className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <Input
                            label="Full Name"
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleInputChange}
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="w-full relative">
                            <Input
                                label="Email"
                                value={formData.email}
                                disabled
                                name="email"
                                onChange={handleInputChange}
                                className="w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="w-full relative">
                            <Input
                                label="Phone Number"
                                value={formData.phoneNumber}
                                name="phoneNumber"
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Nationality"
                            value={formData.nationality}
                            name="nationality"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Father's Name"
                            value={formData.fatherName}
                            name="fatherName"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Mother's Name"
                            value={formData.motherName}
                            name="motherName"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="NID Number"
                            value={formData.nidNumber}
                            name="nidNumber"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Gender Select */}
                    <div className="flex items-center space-x-4">
                        <Select
                            label="Select Gender"
                            name="gender"
                            value={formData.gender || ""}
                            onChange={(value) => {
                                // Manually trigger the handleInputChange function
                                handleInputChange({ target: { name: "gender", value } });
                            }}
                            className="w-full"
                        >
                            <Option value="">Select Gender</Option>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>

                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            name="dateOfBirth"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Blood Group */}
                    <div className="flex items-center space-x-4">
                        <Select
                            label="Blood Group"
                            name="bloodGroup"
                            value={formData.bloodGroup || ""}
                            onChange={(value) => {
                                // Manually trigger the handleInputChange function
                                handleInputChange({ target: { name: "bloodGroup", value } });
                            }}
                            className="w-full"
                        >
                            <Option value="">Select Blood Group</Option>
                            <Option value="A+">A+</Option>
                            <Option value="A-">A-</Option>
                            <Option value="B+">B+</Option>
                            <Option value="B-">B-</Option>
                            <Option value="O+">O+</Option>
                            <Option value="O-">O-</Option>
                            <Option value="AB+">AB+</Option>
                            <Option value="AB-">AB-</Option>
                        </Select>
                    </div>


                    {/* Member Type */}
                    <div className="flex items-center space-x-4">
                        <Select
                            label="Member Type"
                            name="member"
                            value={formData.member || ""}  // Ensure the value is set correctly
                            onChange={(value) => {
                                // Manually trigger the handleInputChange function
                                handleInputChange({ target: { name: "member", value } });
                            }}
                            className="w-full"
                        >
                            <Option value="" disabled >Select Member Type</Option>
                            <Option value="General Member">General Member</Option>
                            <Option value="Central chief Organizer">Central chief Organizer</Option>
                            <Option value="Central Organizer">Central Organizer</Option>
                            <Option value="Divisional Chief Organizer">Divisional Chief Organizer</Option>
                            <Option value="Divisional Organizer">Divisional Organizer</Option>
                            <Option value="District Chief Organizer">District Chief Organizer</Option>
                            <Option value="District Organizer">District Organizer</Option>
                            <Option value="Upazila Chief Organizer">Upazila Chief Organizer</Option>
                            <Option value="Upazila Organizer">Upazila Organizer</Option>
                            <Option value="Union Organizer">Union Organizer</Option>
                            <Option value="Ward Organizer">Ward Organizer</Option>
                        </Select>
                    </div>


                    {/* Payment Method */}
                    <div className="flex items-center space-x-4">
                        <Select
                            label="Payment Method"
                            name="payment"
                            value={formData.payment}
                            onChange={(value) => {
                                // Manually trigger the handleInputChange function
                                handleInputChange({ target: { name: "payment", value } });
                            }}
                            className="w-full"
                        >
                            <Option value="">Select Payment Method</Option>
                            <Option value="Bkash">Bkash</Option>
                            <Option value="Nagad">Nagad</Option>
                            <Option value="Rocket">Rocket</Option>
                            <Option value="Bank">Bank</Option>
                            <Option value="Cash">Cash</Option>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Transaction Id"
                            value={formData.transactionId}
                            name="transactionId"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="End Date"
                            value={formData.endDate}
                            name="endDate"
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Membership Type */}
                    <div className="flex items-center space-x-4">
                        <Select
                            label="Membership Type"
                            name="membershipType"
                            value={formData.membershipType || ""} // Use an empty string if membershipType is not set
                            onChange={(value) => {
                                // Manually trigger the handleInputChange function
                                handleInputChange({ target: { name: "membershipType", value } });
                            }}
                            className="w-full"
                        >
                            <Option value="" disabled>Select Membership Type</Option>
                            <Option value="Monthly">Monthly</Option>
                            <Option value="Half Yearly">Half Yearly</Option>
                            <Option value="Yearly">Yearly</Option>
                            <Option value="Lifetime">Lifetime</Option>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Input
                            label="Membership Cost"
                            value={formData.membershipCost}
                            name="membershipCost"
                            onChange={handleInputChange}
                            className="w-full"
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
