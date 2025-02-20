import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Typography, Select, Option } from "@material-tailwind/react";

const EditAdmin = () => {
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

  const [locationData, setLocationData] = useState({
    divisions: [],
    districts: [],
    thanas: [],
    postOffices: [],
    wards: [],
  });

  const [selectedPostOffice, setSelectedPostOffice] = useState(formData.postOffice || "");
  const [selectedDivision, setSelectedDivision] = useState(formData.division || "");
  const [selectedDistrict, setSelectedDistrict] = useState(formData.district || "");
  const [selectedThana, setSelectedThana] = useState(formData.thana || "");
  const [selectedWard, setSelectedWard] = useState(formData.ward || "");

  const [customPostOffice, setCustomPostOffice] = useState("");
  const [customDivision, setCustomDivision] = useState("");
  const [customDistrict, setCustomDistrict] = useState("");
  const [customThana, setCustomThana] = useState("");
  const [customWard, setCustomWard] = useState("");

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const response = await fetch("http://localhost:5000/signup");
        const data = await response.json();

        if (data) {
          setLocationData({
            divisions: data.map((user) => user.division),
            districts: data.map((user) => user.district),
            thanas: data.map((user) => user.thana),
            postOffices: data.map((user) => user.postOffice),
            wards: data.map((user) => user.ward),
          });
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }

    fetchLocationData();
  }, []);

  const handleInputChange = (e) => {
    const target = e.target || e;
    if (target && target.name && target.value !== undefined) {
      const { name, value } = target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (field, setField) => (e) => {
    const value = e.target.value;
    setField(value);
    if (value !== "Other") {
      setCustomPostOffice(""); // Clear custom input if it's not "Other"
    }
  };

  const handleCustomChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleUpdate = async () => {
    const updatedFormData = {
      ...formData,
      postOffice: selectedPostOffice === "Other" ? customPostOffice : selectedPostOffice,
      division: selectedDivision === "Other" ? customDivision : selectedDivision,
      district: selectedDistrict === "Other" ? customDistrict : selectedDistrict,
      thana: selectedThana === "Other" ? customThana : selectedThana,
      ward: selectedWard === "Other" ? customWard : selectedWard,
    };

    if (!updatedFormData.fullName || !updatedFormData.email) {
      alert("Full Name and Email are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/User-Admin/${adminData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to update the Member.');
      }

      const data = await response.json();
      if (data.success) {
        alert("Member updated successfully!");
        navigate("/dashboard/manage-admin");
      } else {
        alert("Member update failed.");
        navigate("/dashboard/manage-admin");
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





          {/* Division Select */}
          <div className="space-y-2">
            <label htmlFor="division" className="block text-sm text-gray-800">Division</label>
            <select
              id="division"
              name="division"
              value={selectedDivision}
              onChange={handleSelectChange('division', setSelectedDivision)}
              className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
            >
              <option value="">Select Division</option>
              {locationData.divisions.map((division, index) => (
                <option key={index} value={division}>{division}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedDivision === "Other" && (
              <input
                type="text"
                value={customDivision}
                onChange={handleCustomChange(setCustomDivision)}
                placeholder="Enter custom Division"
                className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              />
            )}
          </div>

          {/* District Select */}
          <div className="space-y-2">
            <label htmlFor="district" className="block text-sm text-gray-800">District</label>
            <select
              id="district"
              name="district"
              value={selectedDistrict}
              onChange={handleSelectChange('district', setSelectedDistrict)}
              className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
            >
              <option value="">Select District</option>
              {locationData.districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedDistrict === "Other" && (
              <input
                type="text"
                value={customDistrict}
                onChange={handleCustomChange(setCustomDistrict)}
                placeholder="Enter custom District"
                className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              />
            )}
          </div>

          {/* Thana Select */}
          <div className="space-y-2">
            <label htmlFor="thana" className="block text-sm text-gray-800">Thana</label>
            <select
              id="thana"
              name="thana"
              value={selectedThana}
              onChange={handleSelectChange('thana', setSelectedThana)}
              className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
            >
              <option value="">Select Thana</option>
              {locationData.thanas.map((thana, index) => (
                <option key={index} value={thana}>{thana}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedThana === "Other" && (
              <input
                type="text"
                value={customThana}
                onChange={handleCustomChange(setCustomThana)}
                placeholder="Enter custom Thana"
                className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              />
            )}
          </div>

          {/* Ward Select */}
          <div className="space-y-2">
            <label htmlFor="ward" className="block text-sm text-gray-800">Ward</label>
            <select
              id="ward"
              name="ward"
              value={selectedWard}
              onChange={handleSelectChange('ward', setSelectedWard)}
              className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
            >
              <option value="">Select Ward</option>
              {locationData.wards.map((ward, index) => (
                <option key={index} value={ward}>{ward}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedWard === "Other" && (
              <input
                type="text"
                value={customWard}
                onChange={handleCustomChange(setCustomWard)}
                placeholder="Enter custom Ward"
                className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              />
            )}
          </div>

          {/* Post Office Select */}
          <div className="space-y-2">
            <label htmlFor="postOffice" className="block text-sm text-gray-800">Post Office</label>
            <select
              id="postOffice"
              name="postOffice"
              value={selectedPostOffice}
              onChange={handleSelectChange('postOffice', setSelectedPostOffice)}
              className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
            >
              <option value="">Select Post Office</option>
              {locationData.postOffices.map((postOffice, index) => (
                <option key={index} value={postOffice}>{postOffice}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedPostOffice === "Other" && (
              <input
                type="text"
                value={customPostOffice}
                onChange={handleCustomChange(setCustomPostOffice)}
                placeholder="Enter custom Post Office"
                className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              />
            )}
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
              <Option value="Division Admin">Division Admin</Option>
              <Option value="District Admin">District Admin</Option>
              <Option value="Paurasabha Ward Admin">Paurasabha Ward Admin</Option>
              <Option value="City Corporation Ward Admin">City Corporation Ward Admin</Option>
              <Option value="Upazila Admin">Upazila Admin</Option>
              <Option value="Union Admin">Union Admin</Option>
              <Option value="Ward Admin">Ward Admin</Option>

            </Select>
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

export default EditAdmin;
