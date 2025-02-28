import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Work_Profile = () => {
    const { id } = useParams();
    const [admin, setAdmin] = useState(null);
    const [data, setData] = useState(null);
    const [pieData, setPieData] = useState(null); // Store Pie chart data
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('All');

    // Fetch admin details
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user-details/${id}`);
                const data = await response.json();
                setAdmin(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin details:', error);
                setLoading(false);
            }
        };
        fetchAdminDetails();
    }, [id]);

    // Date filtering function
    const filterByDate = (members, filterType) => {
        const currentDate = new Date();
        return members.filter((member) => {
            const memberDate = new Date(member.createDate);
            switch (filterType) {
                case 'Daily':
                    return memberDate.toDateString() === currentDate.toDateString();
                case 'Monthly':
                    return memberDate.getMonth() === currentDate.getMonth() && memberDate.getFullYear() === currentDate.getFullYear();
                case 'Yearly':
                    return memberDate.getFullYear() === currentDate.getFullYear();
                default:
                    return true;
            }
        });
    };

    const categorizeMembers = (members) => {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // Format current date: YYYY-MM-DD
        console.log(formattedCurrentDate);
    
        let subscribedCount = 0;
        let unsubscribedCount = 0;
    
        members.forEach((member) => {
            // Skip members with roles like 'Division Admin', 'District Admin', etc.
            const excludedRoles = [
                'Division Admin', 
                'District Admin',
                'City Corporation Ward Admin', 
                'Paurasabha Ward Admin',
                'Upazila Admin', 
                'Union Admin', 
                'Ward Admin'
            ];
    
            // If the member's role is one of the excluded roles, skip further processing
            if (excludedRoles.includes(member.member)) {
                return; // Skip this member
            }
    
            const endDate = new Date(member.endDate);
            if (member.aproval === 'approved' && formattedCurrentDate < endDate.toISOString().split('T')[0]) {
                subscribedCount++;
            } else if (member.aproval === 'approved' && formattedCurrentDate >= endDate.toISOString().split('T')[0]) {
                unsubscribedCount++;
            }
        });
    
        return { subscribedCount, unsubscribedCount };
    };
    

    // Fetch and filter data based on admin's role, approval status, and selected filter
    useEffect(() => {
        const fetchRoleBasedData = async () => {
            if (admin) {
                try {
                    const response = await fetch(`http://localhost:5000/signup`);
                    const membersData = await response.json();

                    let filteredMembers = [];
                    switch (admin.member) {
                        case 'Division Admin':
                            filteredMembers = membersData.filter(member => 
                                member.division === admin.division && member.aproval === 'approved');
                            break;
                        case 'District Admin':
                            filteredMembers = membersData.filter(member => 
                                member.district === admin.district && member.aproval === 'approved');
                            break;
                        case 'City Corporation Ward Admin':
                            filteredMembers = membersData.filter(member =>
                                member.cityCorporationWard === admin.cityCorporationWard && member.aproval === 'approved');
                            break;
                        case 'Paurasabha Ward Admin':
                            filteredMembers = membersData.filter(member =>
                                member.paurasabhaWard === admin.paurasabhaWard && member.aproval === 'approved');
                            break;
                        case 'Upazila Admin':
                            filteredMembers = membersData.filter(member => 
                                member.thana === admin.thana && member.aproval === 'approved');
                            break;
                        case 'Union Admin':
                            filteredMembers = membersData.filter(member => 
                                member.postOffice === admin.postOffice && member.aproval === 'approved');
                            break;
                        case 'Ward Admin':
                            filteredMembers = membersData.filter(member => 
                                member.ward === admin.ward && member.aproval === 'approved');
                            break;
                        default:
                            break;
                    }

                    filteredMembers = filterByDate(filteredMembers, filterType);

                    // Generate data for Bar chart
                    const memberCount = filteredMembers.reduce((acc, member) => {
                        acc[member.member] = (acc[member.member] || 0) + 1;
                        return acc;
                    }, {});

                    const chartData = {
                        labels: Object.keys(memberCount),
                        datasets: [
                            {
                                label: 'Number of Members',
                                data: Object.values(memberCount),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    };

                    // Set Bar chart data
                    setData(chartData);

                    // Generate data for Pie chart (Subscribed vs Unsubscribed)
                    const { subscribedCount, unsubscribedCount } = categorizeMembers(filteredMembers);

                    const pieChartData = {
                        labels: ['Subscribed', 'Unsubscribed'],
                        datasets: [
                            {
                                data: [subscribedCount, unsubscribedCount],
                                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                                borderWidth: 1,
                            },
                        ],
                    };

                    // Set Pie chart data
                    setPieData(pieChartData);
                } catch (error) {
                    console.error('Error fetching members data:', error);
                }
            }
        };

        if (!loading && admin) {
            fetchRoleBasedData();
        }
    }, [admin, loading, filterType]);

    if (loading) return <div className="text-center text-xl text-blue-500">Loading...</div>;
    if (!admin) return <div className="text-center text-xl text-red-500">Admin not found</div>;

    return (
        <div className="container mx-auto p-6">
            <p className="text-center text-lg mb-8">Welcome {admin.fullName}</p>

            <div className="flex justify-center mb-6 space-x-4">
                {/* Filter Buttons */}
                <button
                    onClick={() => setFilterType('Daily')}
                    className={`px-4 py-2 rounded-lg text-white ${filterType === 'Daily' ? 'bg-blue-500' : 'bg-gray-600 hover:bg-blue-500'} transition-all duration-300`}
                >
                    Daily
                </button>
                <button
                    onClick={() => setFilterType('Monthly')}
                    className={`px-4 py-2 rounded-lg text-white ${filterType === 'Monthly' ? 'bg-blue-500' : 'bg-gray-600 hover:bg-blue-500'} transition-all duration-300`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setFilterType('Yearly')}
                    className={`px-4 py-2 rounded-lg text-white ${filterType === 'Yearly' ? 'bg-blue-500' : 'bg-gray-600 hover:bg-blue-500'} transition-all duration-300`}
                >
                    Yearly
                </button>
                <button
                    onClick={() => setFilterType('All')}
                    className={`px-4 py-2 rounded-lg text-white ${filterType === 'All' ? 'bg-blue-500' : 'bg-gray-600 hover:bg-blue-500'} transition-all duration-300`}
                >
                    All
                </button>
            </div>

            {/* Bar Chart for Member Distribution */}
            {data ? (
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Members Distribution</h3>
                    <Bar data={data} />
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">No data available for this role</p>
            )}

            {/* Pie Chart for Subscribed vs Unsubscribed Members */}
            
{pieData ? (
    <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-4">Subscribed vs Unsubscribed Members</h3>
        <div className="max-w-3xl mx-auto" style={{ height: '400px', width: '400px' }}> {/* Adjust width and height */}
            <Pie 
                data={pieData} 
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                }} 
            />
        </div>
    </div>
) : (
    <p className="text-center text-lg text-gray-500">No subscription data available</p>
)}

        </div>
    );
};

export default Work_Profile;
