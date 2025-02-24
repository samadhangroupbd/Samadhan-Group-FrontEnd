import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

const InvoiceAndOthers = () => {
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

    if (!admin) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div>
            {/* Profile Card */}
            <div className="flex justify-center items-center min-h-screen p-4">
                <Card className="w-full sm:w-96 md:w-80 lg:w-72 xl:w-64 mb-6">
                    <CardHeader floated={false} className="h-80">
                        <img
                            src={admin.image || "https://docs.material-tailwind.com/img/team-3.jpg"} // Dynamically set profile image if available
                            alt="profile-picture"
                            className="object-cover w-full h-full"
                        />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            {admin.fullName || "Name not available"}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            {admin.member || "Position not available"}
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex justify-center gap-7 pt-2">
                        <Tooltip content="Like">
                            <Typography as="a" href="#facebook" variant="lead" color="blue" textGradient>
                                <i className="fab fa-facebook" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography as="a" href="#twitter" variant="lead" color="light-blue" textGradient>
                                <i className="fab fa-twitter" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography as="a" href="#instagram" variant="lead" color="purple" textGradient>
                                <i className="fab fa-instagram" />
                            </Typography>
                        </Tooltip>
                    </CardFooter>
                </Card>
            </div>

            {/* Stats */}
            <div className="stats shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">


                {/* Invoice */}
                <div className="stat">
                    <div className="stat-figure text-primary"></div>
                    <div className="stat-value text-primary text-xl">Invoice</div>
                    <div className="stat-desc">Invoices generated</div>
                </div>

                {/* Certificate */}
                <Link to={`/dashboard/certificate/${id}`}>
                    <div className="stat">
                        <div className="stat-figure text-secondary"></div>
                        <div className="stat-value text-primary text-xl">Certificate</div>
                        <div className="stat-desc">Certificate generated</div>
                    </div>
                </Link>

                {/* ID Card */}
                <Link to={`/dashboard/id-card/${id}`}>
                    <div className="stat">
                        <div className="stat-figure text-accent"></div>
                        <div className="stat-value text-primary text-xl">ID Card</div>
                        <div className="stat-desc">ID Card generated</div>
                    </div>
                </Link>

                {/* Personal Info */}
                <Link to={`/dashboard/registration-form/${id}`}>
                    <div className="stat">
                        <div className="stat-figure text-primary"></div>
                        <div className="stat-value text-primary text-xl">Registration Form</div>
                        <div className="stat-desc">Registration form generated</div>
                    </div>
                </Link>



                {/* Appointment Letter */}
                <div className="stat">
                    <div className="stat-figure text-warning"></div>
                    <div className="stat-value text-primary text-xl">Appointment</div>
                    <div className="stat-desc">Appointment Letter generated</div>
                </div>

                {/* Visiting Card */}
                <div className="stat">
                    <div className="stat-value text-primary text-xl">Visiting Card</div>
                    <div className="stat-desc">Visiting Card generated</div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceAndOthers;
