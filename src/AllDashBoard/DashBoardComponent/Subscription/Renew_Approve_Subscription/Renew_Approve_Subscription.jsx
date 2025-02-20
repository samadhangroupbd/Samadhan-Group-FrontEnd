import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
    CardFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Use react-router-dom Link
import { FaEye } from "react-icons/fa";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// Define roles you're interested in
const ROLES_TO_FILTER = [
    "General Member",
    "Central chief Organizer",
    "Central Organizer",
    "Divisional Chief Organizer",
    "Divisional Organizer",
    "District Chief Organizer",
    "District Organizer",
    "Upazila Chief Organizer",
    "Upazila Organizer",
    "Union Organizer",
    "Ward Organizer",
];

// Table headers
const TABLE_HEAD = ["Member", "Position", "Profile ID", "Joining Date", "Availability", "Actions"];

const Renew_Approve_Subscription = () => {
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [selectedRole, setSelectedRole] = useState("All"); // Selected role for filtering
    const [loading, setLoading] = useState(false);

    // Fetch data from the API
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("http://localhost:5000/signup");
                const data = await response.json();

                // Filter the members based on approval status (approved) and roles
                const filteredMembers = data
                    .filter((member) => member.paymentApprove === "no") // Filter for approved members
                    .filter((member) => ROLES_TO_FILTER.includes(member.member)); // Filter by role

                // Set filtered members to state
                setMembers(filteredMembers);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);


    // Update this in the delete handler
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Member?');
        if (!confirmDelete) return;

        setLoading(true); // Start loading

        fetch(`http://localhost:5000/UserAdmin-delete/${id}`, { method: 'DELETE' })
            .then(() => {
                setMembers(members.filter((member) => member._id !== id));
                setLoading(false); // Stop loading after deletion
            })
            .catch((error) => {
                console.error('Error deleting Member:', error);
                setLoading(false); // Stop loading in case of error
            });
    };

    // Handle approve action
    const handleApprove = (id) => {
        const confirmApprove = window.confirm("Are you sure you want to approve this Subscription?");
        if (!confirmApprove) return;

        setLoading(true); // Start loading

        fetch(`http://localhost:5000/approve-renew-subscription/${id}`, {
            method: 'PUT', // Changed to PUT as per the backend implementation
            headers: {
                'Content-Type': 'application/json', // Make sure to send content as JSON
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error approving Subscription');
                }
                return response.json();
            })
            .then(() => {
                // Update the local state after approval
                setMembers((prevMembers) =>
                    prevMembers.map((member) =>
                        member._id === id ? { ...member, paymentApprove: "yes" } : member
                    )
                );
                setLoading(false); // Stop loading after approval
                navigate("/dashboard/manage-members");  // Redirect to the same page after approval
            })
            .catch((error) => {
                console.error('Error approving admin:', error);
                setLoading(false); // Stop loading in case of error
                navigate("/dashboard/manage-members");
            });
    };


    // Filter members based on search query and selected role
    const filteredMembers = members
        .filter(
            (member) =>
                member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.profileId.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((member) => {
            if (selectedRole === "All") return true; // Show all members
            return member.member === selectedRole; // Show members for the selected role
        });

    // Calculate availability based on endDate
    const getAvailability = (endDate, paymentApprove) => {
        const currentDate = new Date();
        const end = new Date(endDate);

        // Check if paymentApprove is "no" or the endDate is past
        if (paymentApprove === "no" || end < currentDate) {
            return "Unavailable";
        }

        return "Available";
    };


    return (
        <div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8 flex-wrap">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                            <Typography variant="h5" color="blue-gray">
                                Members list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all Members
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {["All", ...ROLES_TO_FILTER].map((role) => (
                                <Button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    variant={selectedRole === role ? "filled" : "outlined"}
                                    className="sm:w-auto w-full"
                                >
                                    {role}
                                </Button>
                            ))}
                        </div>
                        <div className="w-full sm:w-80 md:w-96 lg:w-1/2">
                            <Input
                                label="Search(Name/Profile Id)"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 sm:p-3 md:p-4 lg:p-4"
                                labelProps={{
                                    className: "text-xs sm:text-sm lg:text-base",
                                }}
                                inputProps={{
                                    className: "flex items-center",
                                }}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="overflow-x-auto px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map(
                                ({ _id, fullName, email, phoneNumber, nationality, role, image, password, fatherName,
                                    motherName,
                                    nidNumber,
                                    gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, general, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, aproval, createDate, createTime, endDate, paymentApprove, membershipType, membershipCost }, index) => {
                                    const classes = index === filteredMembers.length - 1 ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={_id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={image} alt={fullName} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {fullName}
                                                        </Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {member}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {profileId}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {createDate}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {getAvailability(endDate, paymentApprove)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex gap-2">

                                                    {/* Approve Button */}
                                                    <Tooltip content="Approve">
                                                        <Button
                                                            variant="filled"
                                                            size="sm"
                                                            color="green"
                                                            onClick={() => handleApprove(_id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                    </Tooltip>


                                                    <Tooltip content="Edit">
                                                        <Link to={`/Edit_SubscriptionRenew/${_id}`} state={{
                                                            adminData: {
                                                                _id, fullName, email, phoneNumber, nationality, role, image, password, fatherName,
                                                                motherName,
                                                                nidNumber,
                                                                gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, general, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, aproval, createDate, createTime, endDate, paymentApprove, membershipType, membershipCost
                                                            }
                                                        }}>
                                                            <IconButton variant="text">
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>


                                                    <Link to={`/dashboard/member-details/${_id}`}>
                                                        <Tooltip content="View">
                                                            <IconButton variant="text">
                                                                <FaEye className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>



                                                    <Tooltip content="Delete">
                                                        <IconButton variant="text">
                                                            <TrashIcon className="h-4 w-4 text-red-500" onClick={() => handleDelete(`${_id}`)} />
                                                        </IconButton>
                                                    </Tooltip>


                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default Renew_Approve_Subscription;
