import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const View_Renew_Subscription = () => {
  const { id } = useParams(); // Get the profileId from the URL
  const [admin, setAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // For storing selected image

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-details/${id}`);
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching Member details:", error);
      }
    };
    fetchAdminDetails();
  }, [id]);

  if (!admin) return <div className="text-center text-lg">Loading...</div>;


  // Handle image click to open modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };


  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Main container */}
      <div className="space-y-8 mt-20">
        {/* Top row: Admin Images */}
        <div className="flex flex-wrap justify-center md:justify-around  space-x-4 my-8">
          {/* Profile Image */}
          <div className="flex justify-center items-center mb-4">
            <img
              className="rounded-full w-32 h-32 object-cover shadow-2xl border-4 border-blue-600 cursor-pointer"
              src={admin.image}
              alt={admin.fullName}
              onClick={() => openModal(admin.image)} // Open modal on click
            />
          </div>

          {/* NID Birth Image */}
          <div className="flex justify-center items-center mb-4">
            <img
              className="rounded-full w-32 h-32 object-cover shadow-2xl border-4 border-blue-600 cursor-pointer"
              src={admin.nidBirthImage}
              alt="NID Birth Image"
              onClick={() => openModal(admin.nidBirthImage)} // Open modal on click
            />
          </div>


          <div className="flex justify-center items-center mb-4">
            <img
              className="rounded-full w-32 h-32 object-cover shadow-2xl border-4 border-blue-600 cursor-pointer"
              src={admin.paymentPhoto}
              alt="Payment Photo"
              onClick={() => openModal(admin.paymentPhoto)} // Open modal on click
            />
          </div>


        </div>

        {/* Admin Details */}
        <Card className="p-6 shadow-xl bg-white rounded-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-4 rounded-t-lg shadow-md">
            <Typography variant="h5" color="white">Member Profile</Typography>
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

              {/* Additional Membership and Payment Info */}
              <div className="space-y-2">
                <Typography variant="h6" className="text-xl font-semibold text-gray-800">Membership Type:</Typography>
                <Typography variant="small" className="text-lg text-gray-600">{admin.membershipType}</Typography>
              </div>

              <div className="space-y-2">
                <Typography variant="h6" className="text-xl font-semibold text-gray-800">Membership Cost:</Typography>
                <Typography variant="small" className="text-lg text-gray-600">{admin.membershipCost}</Typography>
              </div>

              <div className="space-y-2">
                <Typography variant="h6" className="text-xl font-semibold text-gray-800">Payment Method:</Typography>
                <Typography variant="small" className="text-lg text-gray-600">{admin.payment}</Typography>
              </div>

              <div className="space-y-2">
                <Typography variant="h6" className="text-xl font-semibold text-gray-800">Transaction ID:</Typography>
                <Typography variant="small" className="text-lg text-gray-600">{admin.transactionId}</Typography>
              </div>

              <div className="space-y-2">
                <Typography variant="h6" className="text-xl font-semibold text-gray-800">End Date:</Typography>
                <Typography variant="small" className="text-lg text-gray-600">{admin.endDate}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Modal for Image Display */}
      {isModalOpen && (
        <div className="fixed inset-0 mt-20 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative mt-20">
            <img
              className="max-w-full max-h-full object-contain"
              src={selectedImage}
              alt="Selected"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default View_Renew_Subscription;
