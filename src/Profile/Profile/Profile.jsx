import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Components/Authentication/AuthProvider/AuthProvider.jsx';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Register chart.js components

const Profile = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user data from AuthContext
  const [registrationData, setRegistrationData] = useState(null); // State to hold fetched user data
  const [showProfileId, setShowProfileId] = useState(false); // State to toggle visibility of Profile ID
  const [referenceIdCountByMonth, setReferenceIdCountByMonth] = useState([]); // State for referenceId count by month-year

  useEffect(() => {
    // Fetch user data from API based on email
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/signup');
        const data = response.data;

        // Find the user data by matching email
        const userData = data.find((item) => item.email === user?.email);

        if (userData) {
          setRegistrationData(userData);

          // Count users with the same referenceId by month and year
          const referenceIdData = {};
          data.forEach((item) => {
            if (item.referenceId === userData.profileId) {
              const date = new Date(item.createDate);
              const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

              if (!referenceIdData[monthYear]) {
                referenceIdData[monthYear] = 0;
              }
              referenceIdData[monthYear]++;
            }
          });

          // Convert the referenceIdData into an array for chart
          const chartData = Object.keys(referenceIdData).map((key) => ({
            monthYear: key,
            count: referenceIdData[key],
          }));

          // Sort the data by month-year (chronologically)
          chartData.sort((a, b) => {
            const [monthA, yearA] = a.monthYear.split('-').map(Number);
            const [monthB, yearB] = b.monthYear.split('-').map(Number);

            if (yearA === yearB) {
              return monthA - monthB; // Sort by month
            }
            return yearA - yearB; // Sort by year
          });

          setReferenceIdCountByMonth(chartData); // Store count by month and year
        } else {
          console.log('No matching user found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.email) {
      fetchUserData(); // Fetch user data when user.email is available
    }
  }, [user?.email]);

  // If registration data is not available yet, show loading
  if (!registrationData) {
    return <p>Loading user data...</p>;
  }

  // Logic to determine what information to show based on the member type
  let additionalInfo;
  switch (registrationData.member) {
    case 'Ward Organizer':
      additionalInfo = registrationData.ward;
      break;
    case 'Union Organizer':
      additionalInfo = registrationData.postOffice;
      break;
    case 'Upazila Organizer':
    case 'Upazila Chief Organizer':
      additionalInfo = registrationData.thana;
      break;
    case 'District Organizer':
    case 'District Chief Organizer':
      additionalInfo = registrationData.district;
      break;
    case 'Divisional Organizer':
    case 'Divisional Chief Organizer':
      additionalInfo = registrationData.division;
      break;
    case 'Central Organizer':
    case 'Central Chief Organizer':
      additionalInfo = registrationData.country;
      break;
    default:
      additionalInfo = registrationData.country;
      break;
  }

  // Toggle visibility of Profile ID
  const handleProfileIdClick = () => {
    setShowProfileId(!showProfileId); // Toggle state when button is clicked
  };

  // Data for the registration count chart
  const chartData = {
    labels: referenceIdCountByMonth.map((entry) => entry.monthYear), // Use formatted month-year as labels
    datasets: [
      {
        label: 'Users with Same Reference ID',
        data: referenceIdCountByMonth.map((entry) => entry.count), // Count of users in each month-year
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Left Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center">
              <img
                src={registrationData.image || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                alt="avatar"
                className="w-36 h-36 rounded-full mx-auto mb-4"
              />
              <p className="text-lg font-semibold text-gray-700">{registrationData.fullName}</p>
              <p className="text-sm text-gray-500 mb-4">{registrationData.member}</p>
              <p className="text-xs text-gray-500 mb-4">{additionalInfo}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleProfileIdClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
                >
                  Profile ID
                </button>

                <Link to={'/edit-profile'}>
                <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white">Edit Profile</button>
                </Link>
                
              </div>
              {/* Conditionally render the Profile ID */}
              {showProfileId && (
                <p className="mt-4 text-sm text-gray-600 font-bold">Profile ID: {registrationData.profileId}</p>
              )}
              {/* Display the total count of users with the same referenceId */}
              <p className="mt-4 text-sm text-gray-600">
                Total users Refer: {referenceIdCountByMonth.reduce((acc, entry) => acc + entry.count, 0)}
              </p>
            </div>
          </div>

          {/* Profile Right Section */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
            {/* Personal Info */}
            <div className="space-y-6">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-sm text-gray-700">{registrationData.fullName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm text-gray-700">{registrationData.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-sm text-gray-700">{registrationData.phoneNumber}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="text-sm text-gray-700">{registrationData.mobile || 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-sm text-gray-700">{`${registrationData.village}, ${registrationData.district}, ${registrationData.division}`}</p>
              </div>
            </div>

            {/* Registration Count Graph */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800">Users with Same Reference ID - Registrations by Month-Year</h3>
              <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
