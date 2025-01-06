// ViewAdmin.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const ViewAdmin = () => {
  const { id } = useParams(); // Get the profileId from the URL
  const [admin, setAdmin] = useState(null);

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

  if (!admin) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <Typography variant="h5" color="blue-gray">Admin Details</Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="small">Full Name: {admin.fullName}</Typography>
        <Typography variant="small">Email: {admin.email}</Typography>
        <Typography variant="small">Role: {admin.member}</Typography>
        <Typography variant="small">Profile ID: {admin.profileId}</Typography>
        <Typography variant="small">Joining Date: {admin.createDate}</Typography>
        {/* Add more fields as needed */}
      </CardBody>
    </Card>
  );
};

export default ViewAdmin;
