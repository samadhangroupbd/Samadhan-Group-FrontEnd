import React, { useState, useEffect } from "react";
import { EyeSlashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import { MdDriveFileMoveOutline } from "react-icons/md";
import { FcProcess } from "react-icons/fc";

// Define roles you're interested in
const ROLES_TO_FILTER = [

  "Central chief Organizer",
  "Central Organizer",
  "Divisional Chief Organizer",
  "Divisional Organizer",
  "District Chief Organizer",
  "District Organizer",
  "Paurasabha Ward Organizer",
  "City Corporation Ward Organizer",
  "Upazila Chief Organizer",
  "Upazila Organizer",
  "Union Organizer",
  "Ward Organizer",

];

// Table headers
const TABLE_HEAD = ["Member", "Position", "Profile ID", "Joining Date", "Actions"];

const Organizer_Member = () => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedRole, setSelectedRole] = useState("All"); // Selected role for filtering
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch data from the API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/signup");
        const data = await response.json();

        // Filter members for approval status and role
        const filteredMembers = data
          .filter((member) => member.aproval === "approved") // Filter only approved members
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

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

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
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link to={'/dashboard/create-member'}>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Organizer Member
                </Button>
              </Link>
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
                className="w-full p-2 sm:p-3 md:p-4 lg:p-4" // Adjust padding for responsiveness
                labelProps={{
                  className: "text-xs sm:text-sm lg:text-base", // Make label responsive
                }}
                inputProps={{
                  className: "flex items-center", // Align icon and text
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
              {currentMembers.map(
                ({ _id, fullName, email, phoneNumber, nationality, image, fatherName, motherName, nidNumber, gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, createDate, createTime, salary, endDate, membershipType, membershipCost }, index) => {
                  const isLast = index === currentMembers.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                            <Link to={`/dashboard/edit-member/${_id}`} state={{ adminData: { _id, fullName, email, phoneNumber, nationality, image, fatherName, motherName, nidNumber, gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, ward, nidBirthImage, member, payment, transactionId, paymentPhoto, profileId, createDate, createTime, salary, endDate, membershipType, membershipCost } }}>
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

                          <Link to={`/dashboard/work-profile/${_id}`}>
                            <Tooltip content="Work Process">
                              <IconButton variant="text">
                                <FcProcess className="h-4 w-4 text-red-500" />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Link to={`/dashboard/file-manage/${_id}`}>
                            <Tooltip content="File Manage">
                              <IconButton variant="text">
                                <MdDriveFileMoveOutline className="h-4 w-4 text-red-500" />
                              </IconButton>
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

        {/* Pagination */}
        <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="outlined" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Organizer_Member;
