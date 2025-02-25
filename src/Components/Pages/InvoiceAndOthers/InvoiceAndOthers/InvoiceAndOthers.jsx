import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { DocumentTextIcon, IdentificationIcon, AcademicCapIcon, UserCircleIcon, BriefcaseIcon, QrCodeIcon } from "@heroicons/react/24/outline";

const InvoiceAndOthers = () => {
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

    if (!admin) return <div className="text-center text-lg text-gray-600">Loading Profile...</div>;

    const features = [
        { 
            title: "Invoice", 
            icon: <DocumentTextIcon className="h-8 w-8 text-white"/>, 
            link: `/dashboard/invoice/${id}`,
            count: "Generated",
            bg: "bg-gradient-to-r from-blue-500 to-blue-400"
        },
        { 
            title: "Certificate", 
            icon: <AcademicCapIcon className="h-8 w-8 text-white"/>, 
            link: `/dashboard/certificate/${id}`,
            count: "Generated",
            bg: "bg-gradient-to-r from-green-500 to-green-400"
        },
        { 
            title: "ID Card", 
            icon: <IdentificationIcon className="h-8 w-8 text-white"/>, 
            link: `/dashboard/id-card/${id}`,
            count: "Generated",
            bg: "bg-gradient-to-r from-purple-500 to-purple-400"
        },
        { 
            title: "Registration", 
            icon: <UserCircleIcon className="h-8 w-8 text-white"/>, 
            link: `/dashboard/registration-form/${id}`,
            count: "Generated",
            bg: "bg-gradient-to-r from-pink-500 to-pink-400"
        },
        { 
            title: "Appointment", 
            icon: <BriefcaseIcon className="h-8 w-8 text-white"/>, 
            link: "#",
            count: "Generated",
            bg: "bg-gradient-to-r from-orange-500 to-orange-400"
        },
        { 
            title: "Visiting Card", 
            icon: <QrCodeIcon className="h-8 w-8 text-white"/>, 
            link:  `/dashboard/visiting-card/${id}`,
            count: "Generated",
            bg: "bg-gradient-to-r from-teal-500 to-teal-400"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Profile Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <img
                                    src={admin.image || "https://docs.material-tailwind.com/img/team-3.jpg"}
                                    alt="profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute inset-0 rounded-full shadow-inner"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <Typography variant="h3" className="text-2xl font-bold text-gray-800 mb-2">
                                    {admin.fullName || "Name not available"}
                                </Typography>
                                <Typography className="text-lg text-gray-600 mb-4">
                                    {admin.member || "Position not available"}
                                </Typography>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                                        <i className="fab fa-facebook text-blue-600 text-xl"></i>
                                    </button>
                                    <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                                        <i className="fab fa-twitter text-blue-400 text-xl"></i>
                                    </button>
                                    <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                                        <i className="fab fa-linkedin text-blue-700 text-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Link to={feature.link} key={index} className="group">
                        <Card className="h-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <CardBody className="p-6">
                                <div className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                                    {feature.icon}
                                </div>
                                <Typography variant="h5" className="text-lg font-semibold text-gray-800 mb-2">
                                    {feature.title}
                                </Typography>
                                <Typography className="text-sm text-gray-600">
                                    {feature.count}
                                </Typography>
                                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                                    <span className="text-sm font-medium">View Details</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default InvoiceAndOthers;