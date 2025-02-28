import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

const Total_List_Graph = () => {
  const [members, setMembers] = useState([]);
  const [latestMembers, setLatestMembers] = useState([]);

  const adminRoles = [
    "Division Admin",
    "District Admin",
    "City Corporation Ward Admin", "Paurasabha Ward Admin",
    "Upazila Admin",
    "Union Admin",
    "Ward Admin"
  ];

  const memberRoles = [
    "General Member", "Central chief Organizer", "Central Organizer",
    "Divisional Chief Organizer", "Divisional Organizer", "District Chief Organizer", "City Corporation Ward Organizer",
    "Paurasabha Ward Organizer","District Organizer", "Upazila Chief Organizer", "Upazila Organizer",
    "Union Organizer", "Ward Organizer"
  ];

  useEffect(() => {
    // Fetch members from the API
    axios.get("http://localhost:5000/signup")
      .then(response => {
        const fetchedMembers = response.data;
        setMembers(fetchedMembers);
  
        // Filter for approved members
        const approvedMembers = fetchedMembers.filter(member => member.aproval === "approved");
  
        // Sort approved members based on createDate and createTime in descending order
        const sortedMembers = approvedMembers.sort((a, b) => {
          // Combine createDate and createTime into an ISO format string
          const aDateTime = new Date(`${a.createDate}T${a.createTime}`);
          const bDateTime = new Date(`${b.createDate}T${b.createTime}`);
  
          return bDateTime - aDateTime; // Sorting in descending order (latest first)
        });
  
        // Get the latest 5 members (take the last 5 from the sorted list)
        const latestFive = sortedMembers.slice(-5); // Slicing from the end (last 5 members)
        setLatestMembers(latestFive);
      })
      .catch(error => {
        console.error("Error fetching members:", error);
      });
  }, []);
  
  

  // Count members for each role
  const roleCounts = (roleList) => {
    return roleList.reduce((counts, member) => {
      counts[member] = 0;
      return counts;
    }, {});
  };

  const getRoleCounts = () => {
    const allRoles = [...adminRoles, ...memberRoles];
    const roleCountsMap = roleCounts(allRoles);

    members.forEach(member => {
      if (allRoles.includes(member.member)) {
        roleCountsMap[member.member]++;
      }
    });

    return roleCountsMap;
  };

  const roleCountsMap = getRoleCounts();
  const roleNames = Object.keys(roleCountsMap);
  const roleValues = Object.values(roleCountsMap);

  const data = {
    labels: roleNames,
    datasets: [
      {
        label: "Number of Members by Role",
        data: roleValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 p-4">
      {/* Left Side - Graph */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold mb-4">Position</h1>
        <Bar data={data} />
      </div>

      {/* Right Side - Latest Approved Members List (Table format) */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold mb-4">Latest 5 Approved </h1>
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {latestMembers.map((member) => (
                <tr key={member._id}>
                  <td className="border px-4 py-2 text-center">
                    <img src={member.image} alt={member.fullName} className="rounded-full w-12 h-12" />
                  </td>
                  <td className="border px-4 py-2">{member.fullName}</td>
                  <td className="border px-4 py-2">{member.member}</td>
                  <td className="border px-4 py-2">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Total_List_Graph;
