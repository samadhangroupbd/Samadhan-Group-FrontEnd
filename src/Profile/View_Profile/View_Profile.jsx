import React, { useState, useEffect, useContext } from "react";
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
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../Components/Authentication/AuthProvider/AuthProvider";



// Table headers
const TABLE_HEAD = ["Member", "Position", "Profile ID", "Joining Date","Actions"];

const View_Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [selectedRole, setSelectedRole] = useState("All"); // Selected role for filtering
    const [loading, setLoading] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/signup");
                const data = response.data;

                // Filter members based on approval status
                const approvedMembers = data.filter(item => item?.email === user?.email && item.aproval === "approved");
                setMembers(approvedMembers); // Only approved members will be shown
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user?.email]);


    // Filter members based on search query and selected role
    const filteredMembers = members
        .filter(
            (member) =>
                member.fullName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                member.profileId.toLowerCase().startsWith(searchQuery.toLowerCase())
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
        <div className="mt-20">
            <Card className="h-full w-full ">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8 flex-wrap">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                            <Typography variant="h5" color="blue-gray">
                                Subscription Information
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See ur subscription information...
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">

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
                                    gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, general, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, aproval, createDate, createTime, endDate,paymentApprove , membershipType, membershipCost }, index) => {
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
                                                <div className="flex gap-2">
                                                    <Tooltip content="Edit">
                                                        <Link to={`/edit-profile/${_id}`} state={{
                                                            adminData: {
                                                                _id, fullName, email, phoneNumber, nationality, role, image, password, fatherName,
                                                                motherName,
                                                                nidNumber,
                                                                gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, general, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, aproval, createDate, createTime, endDate, membershipType, membershipCost
                                                            }
                                                        }}>
                                                            <Button
                                                                variant="filled"  // Use a filled button to make it more prominent
                                                                color="blue"      // Blue color for the button to give it a professional and calming feel
                                                                className="flex items-center justify-center px-4 py-2 rounded-md text-white hover:bg-blue-600 transition-all duration-200"
                                                            >

                                                                Edit Profile
                                                            </Button>

                                                        </Link>
                                                    </Tooltip>

                                                    <Link to={`/renew-view/${_id}`}>
                                                        <Tooltip content="View">
                                                            <Button
                                                                variant="filled"  // Use a filled button to make it more prominent
                                                                color="red"      // Blue color for the button to give it a professional and calming feel
                                                                className="flex items-center justify-center px-4 py-2 rounded-md text-white hover:bg-red-600 transition-all duration-200"
                                                            >

                                                                View
                                                            </Button>
                                                        </Tooltip>
                                                    </Link>


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

export default View_Profile;
