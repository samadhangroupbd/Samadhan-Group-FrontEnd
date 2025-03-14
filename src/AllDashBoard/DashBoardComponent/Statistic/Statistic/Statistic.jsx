import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Components/Authentication/AuthProvider/AuthProvider";
import Total_List_Graph from "./Total_List_Graph";

const Statistic = () => {
  const { user } = useContext(AuthContext);
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [filter, setFilter] = useState("all");
  const [adminCount, setAdminCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [renewalCount, setRenewalCount] = useState(0);
  const [unsubscribeCount, setUnsubscribeCount] = useState(0); // New state for unsubscribe count

  const getDateDifferenceInDays = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const differenceInTime = currentDate - targetDate;
    return differenceInTime / (1000 * 3600 * 24); // Converts to days
  };

  const filterData = (data) => {
    const today = new Date();
    const filteredData = data.filter((item) => {
      const diffInDays = getDateDifferenceInDays(item.createDate); // or use item.endDate based on your data

      switch (filter) {
        case "daily":
          return diffInDays <= 1 && item.aproval === "approved"; // Filter by approval and time
        case "weekly":
          return diffInDays <= 7 && item.aproval === "approved"; // Filter by approval and time
        case "monthly":
          return diffInDays <= 30 && item.aproval === "approved"; // Filter by approval and time
        case "yearly":
          return diffInDays <= 365 && item.aproval === "approved"; // Filter by approval and time
        case "all":
          return item.aproval === "approved"; // Include all data with approval
        default:
          return item.aproval === "approved"; // Filter by approval only
      }
    });

    return filteredData;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:5000/signup");
        const data = response.data;
 
        // Find the logged-in user's data based on email
        const userData = data.find(item => item.email === user?.email);

        if (userData) {
          setRegistrationData(userData);
        }

        // Filter data based on the selected time period and approval status
        const filteredData = filterData(data);
        
        // Count admins (approved only)
        const adminRoles = ["Division Admin", "District Admin", "City Corporation Ward Admin", "Paurasabha Ward Admin", "Upazila Admin", "Union Admin", "Ward Admin"];
        const admins = filteredData.filter(item => adminRoles.includes(item.member) && item.aproval === "approved");
        setAdminCount(admins.length);

        // Count members (approved only)
        const members = filteredData.filter(item => !adminRoles.includes(item.member) && item.aproval === "approved");
        setMemberCount(members.length);

        // Count renewals (approved and paymentApprove === "yes")
        const renewals = filteredData.filter(item => item.aproval === "approved" && !item.paymentApprove && new Date(item.endDate) > new Date());
        setRenewalCount(renewals.length);

        // Count unsubscribed users (paymentApprove === "no" and endDate is after the current date)
        const unsubscribed = filteredData.filter(item => item.aproval === "approved" && item.paymentApprove === "no" || new Date(item.endDate) < new Date());
        setUnsubscribeCount(unsubscribed.length); // Update unsubscribe count
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading after the data fetch is completed
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email, filter]); // Update the data when filter changes

  // If still loading, show loading message
  // if (loading) {
  //   return <div className="text-center text-xl text-gray-600">Loading user data...</div>;
  // }

  if (!registrationData) {
    return <div className="text-center text-xl text-gray-600">No user data found!</div>;
  }

  console.log(registrationData);

  return (
    <div className="bg-gradient-to-r min-h-screen py-2 px-6 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-screen-xl mx-auto">
        {/* User details card */}
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center justify-center space-y-4 transition-transform duration-300 hover:scale-105 transform">
          <div className="flex flex-col items-center">
            <img
              src={registrationData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gradient-to-r from-purple-400 via-blue-500 to-teal-500 mb-4"
            />
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, {registrationData.fullName}!</h1>
            <p className="text-lg text-gray-600">Your member position: <span className="font-medium text-gray-700">{registrationData.member}</span></p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Data</h2>
            <p className="text-gray-600 mb-4">Select the timeframe for the statistics:</p>
            <select
              className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-indigo-100"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="p-6 my-3 text-gray-100 rounded-lg">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          {/* Admin Count */}
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-white text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-10 w-10 text-purple-500">
                <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{adminCount}</p>
              <p className="capitalize">Admins</p>
            </div>
          </div>

          {/* Members Count */}
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-r from-indigo-600 via-blue-400 to-teal-400 text-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-white text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-10 w-10 text-indigo-500">
                <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                <path d="M256,384A104,104,0,0,0,360,280a104.142,104.142,0,0,0-40-52A104,104,0,0,0,256,128a104,104,0,0,0-64,240A104,104,0,0,0,256,384Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{memberCount}</p>
              <p className="capitalize">Members</p>
            </div>
          </div>

          {/* Renewal Count */}
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-r from-yellow-500 via-orange-400 to-teal-500 text-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-white text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-10 w-10 text-yellow-500">
                <path d="M224,32C107.31,32,16,123.31,16,256s91.31,224,208,224,208-91.31,208-224S340.69,32,224,32Zm0,384c-88.22,0-160-71.78-160-160s71.78-160,160-160,160,71.78,160,160S312.22,416,224,416Z"></path>
                <circle cx="224" cy="256" r="40"></circle>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{renewalCount}</p>
              <p className="capitalize">Renewals</p>
            </div>
          </div>

          {/* Unsubscribed Count */}
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-r from-red-500 via-pink-400 to-teal-500 text-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-white text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-10 w-10 text-red-500">
                <path d="M496 120c0-13.3-10.7-24-24-24h-160c-13.3 0-24 10.7-24 24s10.7 24 24 24h160c13.3 0 24-10.7 24-24z"></path>
                <path d="M304 336c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24s24-10.7 24-24v-48c0-13.3-10.7-24-24-24z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{unsubscribeCount}</p>
              <p className="capitalize">Unsubscribed</p>
            </div>
          </div>
        </div>
      </section>
      <Total_List_Graph></Total_List_Graph>
    </div>
  );
};

export default Statistic;
