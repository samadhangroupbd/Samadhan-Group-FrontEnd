import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const IdCard = () => {
    const { id } = useParams();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user-details/${id}`);
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                console.error("Error fetching admin details:", error);
            }
        };
        fetchAdminDetails();
    }, [id]);

    if (!admin) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 relative">


            {/* ID Card */}
            <div className="w-96 bg-white p-8 rounded-2xl shadow-lg ring-2 ring-green-500 relative z-10">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-green-600">Samadhan Group</h1>
                    <h2 className="text-lg text-gray-600">Employee ID Card</h2>
                </div>

                <div className="flex justify-center mb-3">
                    <img
                        src={admin.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-8 border-green-500 shadow-md object-cover"
                    />
                </div>

                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Name:</p>
                        <p>{admin.fullName}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Email:</p>
                        <p>{admin.email}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Phone:</p>
                        <p>{admin.phoneNumber}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Nationality:</p>
                        <p>{admin.nationality}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Blood Group:</p>
                        <p>{admin.bloodGroup}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Designation:</p>
                        <p>{admin.member}</p>
                    </div>
                </div>

                <div className="mt-6 border-t-4 pt-4 text-center text-gray-600">
                    <p className="text-lg font-semibold text-green-600">ID: {admin.profileId}</p>
                    <p className="text-sm text-gray-500">Issued On: {admin.createDate} {admin.createTime}</p>
                </div>
            </div>
        </div>
    );
};

export default IdCard;






