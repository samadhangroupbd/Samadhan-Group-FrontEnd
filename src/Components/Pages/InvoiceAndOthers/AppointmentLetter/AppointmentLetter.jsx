import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppointmentLetter = () => {

    const { id } = useParams();
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
    // console.log(admin);

    return (
        <div>
            <h1>Appointment Letter</h1>
        </div>
    );
};

export default AppointmentLetter;