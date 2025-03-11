import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const ViewAdmin = () => {
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
        console.error("Error fetching admin details:", error);
      }
    };
    fetchAdminDetails();
  }, [id]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!admin) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl text-gray-600">Loading admin details...</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Image Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[admin.image, admin.nidBirthImage].map((img, index) => (
          <div 
            key={index}
            className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => openModal(img)}
          >
            <img
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              src={img}
              alt={index === 0 ? admin.fullName : index === 1 ? "NID/Birth Certificate" : "Payment Proof"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
              <span className="text-white font-semibold text-lg">
                {index === 0 ? "Profile Photo" : index === 1 ? "NID/Birth Certificate" : "Payment Proof"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Details Section */}
      <Card className="rounded-2xl overflow-hidden shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Typography variant="h2" className="text-white mb-2">{admin.fullName}</Typography>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-500/20 px-4 py-1 rounded-full text-white text-sm">
                  {admin.member} Admin
                </span>
                <span className="text-blue-100">{admin.profileId}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 px-6 py-2 rounded-full">
              <Typography variant="small" className="text-white">
                Registration Date: {admin.createDate}
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information Column */}
            <div className="space-y-6">
              <Section title="Personal Details">
                <DetailItem label="Email" value={admin.email} />
                <DetailItem label="Phone" value={admin.phoneNumber} />
                <DetailItem label="Date of Birth" value={admin.dateOfBirth} />
                <DetailItem label="Blood Group" value={admin.bloodGroup} />
                <DetailItem label="Nationality" value={admin.nationality} />
              </Section>

              <Section title="Family Information">
                <DetailItem label="Father's Name" value={admin.fatherName} />
                <DetailItem label="Mother's Name" value={admin.motherName} />
              </Section>

              <Section title="Membership Info">
                <DetailItem label="Type" value={admin.membershipType} />
                <DetailItem label="Cost" value={admin.membershipCost} />
                <DetailItem label="Payment Method" value={admin.payment} />
                <DetailItem label="Transaction ID" value={admin.transactionId} />
              </Section>
            </div>

            {/* Address & System Information Column */}
            <div className="space-y-6">
              <Section title="Address Details">
                <DetailItem label="Country" value={admin.country} />
                <DetailItem label="Division" value={admin.division} />
                <DetailItem label="District" value={admin.district} />
                <DetailItem label="Thana" value={admin.thana} />
                <DetailItem label="Post Office" value={admin.postOffice} />
                <DetailItem label="Village/Ward" value={`${admin.village} (Ward ${admin.ward})`} />
              </Section>

              <Section title="System Info">
                <DetailItem label="Registration Date" value={`${admin.createDate} ${admin.createTime}`} />
                <DetailItem label="Reference ID" value={admin.referenceId} />
              </Section>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
          <div className="relative max-w-2xl w-full mt-10">
            <img
              className="w-2/3  mx-auto max-h-[90vh] object-contain rounded-lg"
              src={selectedImage}
              alt="Enlarged view"
            />
            <button
              onClick={closeModal}
              className="absolute -top-8 right-0 text-white hover:text-blue-300 transition-colors"
            >
              <span className="text-4xl">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const Section = ({ title, children }) => (
  <div className="border-l-4 border-blue-600 pl-4 space-y-4">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    {children}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800 text-right max-w-[60%] break-words">
      {value || 'N/A'}
    </span>
  </div>
);

export default ViewAdmin;