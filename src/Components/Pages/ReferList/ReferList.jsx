import React, { useState, useEffect } from "react";

// Helper function to fetch the data from your API
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/signup");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const ReferList = () => {
  const [users, setUsers] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Search by ProfileId
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    getUserData();
  }, []);

  // Process the list of users and filter based on referenceId and profileId
  useEffect(() => {
    const findReferrals = () => {
      const updatedReferrals = users.map((user) => {
        // Find users that were referred by this user
        const referredByUser = users.filter(
          (referral) => referral.referenceId === user.profileId
        );

        // Filter by date range (if provided)
        const filteredReferredUsers = referredByUser.filter((referral) => {
          const referralDate = new Date(referral.createDate); // Assuming `createDate` field exists
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;

          return (
            (!start || referralDate >= start) && (!end || referralDate <= end)
          );
        });

        return {
          ...user,
          referredUsers: filteredReferredUsers,
        };
      });

      setReferrals(updatedReferrals);
    };

    if (users.length > 0) {
      findReferrals();
    }
  }, [users, startDate, endDate]); // Add startDate and endDate to dependencies

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtering by ProfileId (searchQuery)
  const filteredReferrals = referrals.filter((user) =>
    user.profileId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">ReferList</h1>

      {/* Date Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <label htmlFor="start-date" className="font-medium text-lg mr-3 text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-4 py-2 border bg-gray-200 border-indigo-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 shadow-md transition-all w-full sm:w-auto"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="end-date" className="font-medium text-lg mr-3 text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
            className="px-4 py-2 bg-gray-200 border border-indigo-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 shadow-md transition-all w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Profile ID"
          className="px-4 py-2 w-full sm:w-1/3 border bg-gray-100 border-indigo-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 shadow-md transition-all"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm font-light table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th scope="col" className="px-4 py-3">#</th> {/* Added serial number column */}
              <th scope="col" className="px-4 py-3">Full Name</th>
              <th scope="col" className="px-4 py-3">Profile ID</th>
              <th scope="col" className="px-4 py-3">Reference ID</th>
              <th scope="col" className="px-4 py-3">Referred Users Count</th>
              <th scope="col" className="px-4 py-3">Referred Users</th>
            </tr>
          </thead>
          <tbody>
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((user, index) => (
                <tr key={user.profileId} className="border-b hover:bg-gray-100 transition-all">
                  <td className="px-4 py-3">{index + 1}</td> {/* Serial number */}
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.profileId}</td>
                  <td className="px-4 py-3">{user.referenceId}</td>
                  <td className="px-4 py-3">{user.referredUsers.length}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openModal(user)}
                      className="text-indigo-600 hover:underline"
                    >
                      View Referred Users
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Loading or no data available...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to show referred users */}
      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Referred Users</h2>
            <div>
              {selectedUser.referredUsers.length > 0 ? (
                selectedUser.referredUsers.map((referral, index) => (
                  <div key={referral.profileId} className="mb-2">
                    <p>
                      <span className="font-semibold">{index + 1}. </span>
                      {referral.fullName} (Profile ID: {referral.profileId})
                    </p>
                  </div>
                ))
              ) : (
                <p>No referred users found.</p>
              )}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferList;
