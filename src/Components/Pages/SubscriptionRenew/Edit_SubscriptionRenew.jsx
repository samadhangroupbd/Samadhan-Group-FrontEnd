import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios"; // You need axios for the request

const Edit_SubscriptionRenew = () => {
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
        profileId: adminData.profileId || "",
        membershipType: adminData.membershipType || "",
        membershipCost: adminData.membershipCost || "",
        paymentPhoto: adminData.paymentPhoto || null,
        paymentApprove:"no",
    });

    const [errors, setErrors] = useState({});
    const [paymentPhotoPreview, setPaymentPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to calculate end date based on membership type
    const calculateEndDate = (selectedMembershipType) => {
        const currentDate = new Date();
        let newEndDate = new Date(currentDate);

        switch (selectedMembershipType) {
            case 'monthly':
                newEndDate.setMonth(newEndDate.getMonth() + 1);
                break;
            case 'half_yearly':
                newEndDate.setMonth(newEndDate.getMonth() + 6);
                break;
            case 'yearly':
                newEndDate.setFullYear(newEndDate.getFullYear() + 1);
                break;
            case 'lifetime':
                newEndDate.setFullYear(newEndDate.getFullYear() + 10);
                break;
            default:
                break;
        }

        // Update the formData state with the new end date and membership cost
        setFormData(prevData => ({
            ...prevData,
            endDate: newEndDate.toISOString().split('T')[0], // set the endDate
            membershipCost: getMembershipCost(selectedMembershipType), // set the membership cost dynamically
        }));
    };

    const getMembershipCost = (membershipType) => {
        switch (membershipType) {
            case 'monthly':
                return '100';
            case 'half_yearly':
                return '500';
            case 'yearly':
                return '900';
            case 'lifetime':
                return '5000';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const updatedData = { ...prevData, [name]: value };
            // Check if membershipType is being changed, and recalculate endDate and membershipCost
            if (name === 'membershipType') {
                calculateEndDate(value); // Recalculate endDate and membershipCost
            }
            return updatedData;
        });
    };

    const handlePaymentPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, paymentPhoto: "File size exceeds 2MB" });
                setPaymentPhotoPreview(null);
            } else if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, paymentPhoto: "Only image files are allowed" });
                setPaymentPhotoPreview(null);
            } else {
                setErrors({ ...errors, paymentPhoto: "" });
                setPaymentPhotoPreview(URL.createObjectURL(file));
                setFormData(prevData => ({
                    ...prevData,
                    paymentPhoto: file,
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
            let paymentPhotoUrl = formData.paymentPhoto;
            if (formData.paymentPhoto && typeof formData.paymentPhoto !== "string") {
                const paymentPhotoFormData = new FormData();
                paymentPhotoFormData.append('image', formData.paymentPhoto);
                const paymentPhotoResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
                    paymentPhotoFormData
                );
                paymentPhotoUrl = paymentPhotoResponse.data.data.display_url;
            }

            const updatedData = { ...formData, paymentPhoto: paymentPhotoUrl };

            const response = await fetch(`http://localhost:5000/User-Admin/${adminData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Please wait until it gets approved.");
            }

            const data = await response.json();
            if (data.success) {
                alert(" successfully!");
                navigate("/dashboard/Renew-subscription");
            } else {
                alert("Please wait until it gets approved!");
            }
        } catch (error) {
            console.error("Error updating Member:", error);
            alert("Please wait until it gets approved.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white w-full sm:w-full md:w-full lg:w-full p-8 rounded-lg shadow-lg">
                <Typography variant="h5" className="text-center font-semibold mb-6 text-blue-600">
                    Renew Subscription
                </Typography>
                <form onSubmit={handleUpdate}>
                    <div className="space-y-4">
                        {/* Payment Method */}
                        <div className="space-y-2">
                            <label htmlFor="payment" className="block text-sm text-gray-800">Payment Method</label>
                            <select
                                id="payment"
                                name="payment"
                                value={formData.payment}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-md ${errors.payment ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            >
                                <option value="" disabled>Select Payment Method</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Bank">Bank</option>
                                <option value="Cash">Cash</option>
                            </select>
                            {errors.payment && <span className="text-xs text-red-400">{errors.payment}</span>}
                        </div>

                        {/* Transaction ID */}
                        <div className="space-y-2">
                            <label htmlFor="transactionId" className="block text-sm text-gray-800">Transaction ID/Serial No</label>
                            <input
                                type="text"
                                id="transactionId"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-md ${errors.transactionId ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            />
                            {errors.transactionId && <span className="text-xs text-red-400">{errors.transactionId}</span>}
                        </div>

                        {/* Payment Proof Image */}
                        <div className="space-y-2">
                            <label htmlFor="paymentPhoto" className="block text-sm text-gray-800">Payment Proof Image</label>
                            <input
                                type="file"
                                id="paymentPhoto"
                                name="paymentPhoto"
                                accept="image/*"
                                onChange={handlePaymentPhotoChange}
                                className={`w-full px-4 py-2 border rounded-md ${errors.paymentPhoto ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            />
                            {errors.paymentPhoto && <span className="text-xs text-red-400">{errors.paymentPhoto}</span>}
                            {paymentPhotoPreview && (
                                <div className="mt-2">
                                    <img src={paymentPhotoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Membership Type, Membership Cost, End Date */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="membershipType" className="block text-sm text-gray-800">Membership Type</label>
                            <select
                                id="membershipType"
                                name="membershipType"
                                value={formData.membershipType}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-md ${errors.membershipType ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            >
                                <option value="" disabled>Select Membership Type</option>
                                <option value="monthly">Monthly</option>
                                <option value="half_yearly">Half Yearly</option>
                                <option value="yearly">Yearly</option>
                                <option value="lifetime">Life Time</option>
                            </select>
                            {errors.membershipType && <span className="text-xs text-red-400">{errors.membershipType}</span>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="membershipCost" className="block text-sm text-gray-800">Membership Cost</label>
                            <input
                                type="text"
                                id="membershipCost"
                                name="membershipCost"
                                value={formData.membershipCost}
                                disabled
                                className={`w-full px-4 py-2 border rounded-md ${errors.membershipCost ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            />
                            {errors.membershipCost && <span className="text-xs text-red-400">{errors.membershipCost}</span>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="endDate" className="block text-sm text-gray-800">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                disabled
                                className={`w-full px-4 py-2 border rounded-md ${errors.endDate ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                            />
                            {errors.endDate && <span className="text-xs text-red-400">{errors.endDate}</span>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Subscription Renew..." : "Subscription Renew"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Edit_SubscriptionRenew;
