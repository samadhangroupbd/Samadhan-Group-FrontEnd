import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const ViewAdmin = () => {
  const { id } = useParams(); // Get the profileId from the URL
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
    <div className="max-w-7xl mx-auto p-8">
      {/* Main container */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Left column: Admin Image */}
        <div className="flex justify-center items-center">
          <img
            className="rounded-full w-60 h-60 object-cover shadow-2xl border-4 border-blue-600"
            src={admin.image}
            alt={admin.fullName}
          />
        </div>

        {/* Right column: Admin Details */}
        <div className="space-y-6">
          <Card className="p-6 shadow-xl bg-white rounded-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-4 rounded-t-lg shadow-md">
              <Typography variant="h5" color="white">Admin Profile</Typography>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {/* Profile Information */}
                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Full Name:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.fullName}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Email:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.email}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Role:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.member}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Profile ID:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.profileId}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Phone Number:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.phoneNumber}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Nationality:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.nationality}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Father's Name:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.fatherName}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Mother's Name:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.motherName}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Date of Birth:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.dateOfBirth}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Blood Group:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.bloodGroup}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Reference ID:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.referenceId}</Typography>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Country:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.country}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Division:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.division}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">District:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.district}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Thana:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.thana}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Post Office:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.postOffice}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Village:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.village}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Ward:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.ward}</Typography>
                </div>

                {/* Creation Info */}
                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Creation Date:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.createDate}</Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="h6" className="text-xl font-semibold text-gray-800">Creation Time:</Typography>
                  <Typography variant="small" className="text-lg text-gray-600">{admin.createTime}</Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmin;
