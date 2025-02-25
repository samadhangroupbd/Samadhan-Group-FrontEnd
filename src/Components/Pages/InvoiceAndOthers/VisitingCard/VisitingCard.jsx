import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const VisitingCard = () => {
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

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add background color (gradient)
        doc.setFillColor(238, 238, 238); // light blue
        doc.rect(0, 0, 210, 297, "F"); // Fill the entire page with the gradient

        // Title
        doc.setFont("Helvetica", "bold", 22);
        doc.setFontSize(40);
        doc.setTextColor(34, 139, 34); // Green color
        doc.text("Samadhan Group", 105, 30, null, null, "center");
        doc.setFont("Helvetica", "normal", 16);
        doc.setTextColor(169, 169, 169); // Gray color
        doc.setFontSize(28);
        doc.text("Visiting Card", 105, 50, null, null, "center");

        // Profile Image (Ensure the image exists in the given URL)
        const imageUrl = admin.image;

        // Create rounded image (circle)
        const x = 83;
        const y = 60;
        const diameter = 40; // Diameter for the circular image

        // Draw the circular area for the profile image (50% radius)
        doc.setFillColor(255, 255, 255); // White background for the circle to make it look clean
        doc.ellipse(x + diameter / 2, y + diameter / 2, diameter / 2, diameter / 2, 'F'); // Draw the circle (background)

        // Add image and clip it into a circle
        doc.addImage(imageUrl, 'JPEG', x, y, diameter, diameter, '', 'S'); // 'S' to clip the image into a circle

        // Add some space below the profile image
        const profileImageBottomY = y + diameter + 10; // Space of 10 units after the profile image

        // Add employee details (aligned key-value pairs)
        const keyX = 20; // X position for the key (left side)
        const lineHeight = 20; // Spacing between lines

        const details = [
            { key: "Name:", value: admin.fullName },
            { key: "Email:", value: admin.email },
            { key: "Phone:", value: admin.phoneNumber },
            { key: "Nationality:", value: admin.nationality },
            { key: "Blood Group:", value: admin.bloodGroup },
            { key: "Address:", value: admin.country +","+ admin.division + ","+admin.district + ","+ admin.thana  },
            { key: "Designation:", value: admin.member },
        ];

        doc.setFontSize(20);
        
        // Loop through each detail and style the key and value
        details.forEach((item, index) => {
            const yOffset = profileImageBottomY + (index * lineHeight); // Adjust vertical spacing for each line
            
            // Key (left side)
            doc.setFont("Helvetica", "bold", 14);
            doc.setTextColor(34, 139, 34); // Green color for keys
            doc.text(item.key, keyX, yOffset);

            // Value (right side)
            const valueWidth = doc.getTextWidth(item.value); // Get width of the value text
            const valueX = 210 - valueWidth - 20; // Align to the right with some padding (20 units from the right edge)
        
            doc.setFont("Helvetica", "normal", 14);
            doc.setTextColor(0, 0, 0); // Black color for values
            doc.text(item.value, valueX, yOffset);
        });

        // ID & Date Section - Centered at the bottom
        const idDateY = 270;
        doc.setFont("Helvetica", "bold", 14);
        doc.setTextColor(34, 139, 34);
        doc.text("ID: " + admin.profileId, 105, idDateY, null, null, "center");

        doc.setFont("Helvetica", "normal", 12);
        doc.setTextColor(169, 169, 169); // Light gray for date text
        doc.text(`Issued On: ${admin.createDate} ${admin.createTime}`, 105, idDateY + 10, null, null, "center");

        // Add border around the entire ID card with rounded corners
        const margin = 10;
        const borderRadius = 15; // Set the radius for the rounded corners
        doc.setLineWidth(2);
        doc.setDrawColor(34, 139, 34); // Green color for the border
        
        // Create the border with rounded corners
        doc.roundedRect(margin, margin, 190, 277, borderRadius, borderRadius);

        // Save the generated PDF
        doc.save("id-card.pdf");
    };

    if (!admin) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-blue-900 text-white to-gray-900 rounded-3xl shadow-2xl transform hover:rotate-0 transition-all duration-500 hover:scale-105 overflow-hidden">
               

                {/* Decorative Elements */}
                <div className="absolute w-48 h-48 bg-blue-200/20 rounded-full -top-24 -right-24"></div>
                <div className="absolute w-64 h-64 bg-purple-200/20 rounded-full -bottom-32 -left-32"></div>
                
                <div className="relative z-10 p-8 md:p-12">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md animate-pulse"></div>
                            <img
                                src={admin.image}
                                alt="Profile"
                                className="w-36 h-36 rounded-full border-4 border-white shadow-xl relative"
                            />
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-300 font-playfair">{admin.fullName}</h1>
                            <p className="text-xl text-blue-600 font-medium mt-2">{admin.member}</p>
                            <div className="mt-3 flex justify-center md:justify-start gap-3">
                                <div className="w-8 h-1 bg-blue-500"></div>
                                <div className="w-8 h-1 bg-purple-500"></div>
                                <div className="w-8 h-1 bg-blue-500"></div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-300">{admin.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium text-gray-300">{admin.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium text-gray-300">{`${admin.village}, ${admin.thana}, ${admin.district}`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Blood Group</p>
                                <p className="font-medium text-gray-300">{admin.bloodGroup}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Profile ID</p>
                            <p className="font-medium text-gray-300">{admin.profileId}</p>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium text-gray-300">{admin.createDate}</p>
                        </div>
                    </div>

                     {/* PDF Download Button */}
                <button
                    onClick={generatePDF}
                    className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Download PDF
                </button>
                </div>
            </div>
        </div>
    );
};

export default VisitingCard;