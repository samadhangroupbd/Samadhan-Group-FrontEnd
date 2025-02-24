import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Import jsPDF AutoTable plugin

const IdCard = () => {
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
    doc.text("Employee ID Card", 105, 50, null, null, "center");

    // Profile Image (Ensure the image exists in the given URL)
    const imageUrl = admin.image;

    // Create rounded image (circle)
    const x = 75;
    const y = 70;
    const diameter = 60; // Diameter for the circular image

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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 relative">
            <div className="w-96 bg-white p-8 rounded-2xl shadow-lg ring-2 ring-green-500 relative z-10">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-green-600">Samadhan Group</h1>
                    <h2 className="text-lg text-gray-600">Employee ID Card</h2>
                </div>
                <div className="flex justify-center mb-3">
                    <img
                        src={admin.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-8 border-green-500 shadow-md object-cover"
                    />
                </div>
                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Name:</p>
                        <p>{admin.fullName}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Email:</p>
                        <p>{admin.email}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Phone:</p>
                        <p>{admin.phoneNumber}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Nationality:</p>
                        <p>{admin.nationality}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Blood Group:</p>
                        <p>{admin.bloodGroup}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-green-600">Designation:</p>
                        <p>{admin.member}</p>
                    </div>
                </div>
                <div className="mt-6 border-t-4 pt-4 text-center text-gray-600">
                    <p className="text-lg font-semibold text-green-600">ID: {admin.profileId}</p>
                    <p className="text-sm text-gray-500">Issued On: {admin.createDate} {admin.createTime}</p>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={generatePDF}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdCard;
