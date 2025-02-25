import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF

const PersonalInfo = () => {
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
    console.log(admin);



    const generatePDF = () => {
        if (!admin) {
            console.error("Admin data is missing");
            return;
        }

        const doc = new jsPDF();

        // Background and Header
        doc.setFillColor(240, 240, 240); // Light gray background for a premium look
        doc.rect(0, 0, 210, 297, "F"); // Fill the entire page

        // // Watermark Image - Add first to place it behind text
        // const watermarkUrl = "/watermarkLogo01.png"; // Add the watermark URL here
        // const watermarkX = 55;  // Center horizontally
        // const watermarkY = 120; // Position in the center of the page
        // const watermarkWidth = 100; // Adjust the size of watermark
        // const watermarkHeight = 100;

        // // Add watermark image with transparency (ensure it's pre-made with low opacity)
        // doc.addImage(watermarkUrl, "PNG", watermarkX, watermarkY, watermarkWidth, watermarkHeight, "50", "S");

        // Image instead of words row
        const rowWidth = 210;  // Adjust the width of the row
        const spaceBetweenX = 2;  // Adjust the space between the image and the words
        const wordsYPosition = 15;  // Adjust the Y position of the words
        const imageUrls = "/dialogue.png";  // Path to the image you'd like to use
        const imageWidth = rowWidth;  // Use the same width as the row
        const imageHeight = 10;  // Adjust this height based on the image aspect ratio or your preferred height

        // Calculate the X position to center the image
        const imageX = spaceBetweenX;  // Starting position of the image (same as the words' X position)
        const imageY = wordsYPosition - 10;  // Same Y position as the words row but adjusting a bit if needed

        // Add the image to the PDF at the specified position
        doc.addImage(imageUrls, "PNG", imageX, imageY, imageWidth, imageHeight);

        // Title and Company Logo
        doc.setFont("Times", "bold");
        doc.setFontSize(35);
        doc.setTextColor(34, 139, 34); // Green color for the title

        // Add "Samadhan Group" Title
        doc.text("Samadhan Group", 105, 33, null, null, "center");

        // Add the Company Logo next to the title (Adjust the logo size)
        const logoUrl = "/logo01.png";
        const logoX = 10;
        const logoY = 22;
        const logoWidth = 20;
        const logoHeight = 20;
        doc.addImage(logoUrl, "PNG", logoX, logoY, logoWidth, logoHeight);

        // Dashed Divider below the title and logo
        doc.setDrawColor(34, 139, 34); // Green color for the divider
        doc.setLineWidth(0.8);

        // Create dashed line using setLineDash
        doc.setLineDash([4, 2]); // [dash length, space length]
        doc.line(10, 48, 200, 48); // Horizontal dashed line

        // Reset to solid line after the dashed line
        doc.setLineDash([]);

        // Add a stylish "Registration Form" title
        doc.setFontSize(20);
        doc.setTextColor(50, 50, 50); // Dark gray color for the subtitle
        doc.text("Registration Form", 105, 70, null, null, "center");

        // Profile Image in the top right corner inside an elegant border
        const imageUrl = admin.image || '';  // Ensure the imageUrl is not undefined or null
        const x = 155;
        const y = 60;
        const diameter = 25;  // Adjusted diameter for the profile image to make it bigger

        // Check if the imageUrl exists before adding it to the PDF
        if (imageUrl) {
            // Add the profile image with the specified position and size
            doc.addImage(imageUrl, "PNG", x, y, diameter, diameter, "", "S");  // "S" for smooth scaling
        }

        // Add space below the profile image
        const profileImageBottomY = y + diameter + 20;

        

        // Define the columns for information
        const leftColumnX = 20;
        const rightColumnX = 105; // Start from the middle of the page
        const lineHeight = 14; // Increased line height for better readability

        // Enhance details sections with more premium fonts and spacing
        const detailsLeft = [
            { key: "Name:", value: admin.fullName || "N/A" },
            { key: "Email:", value: admin.email || "N/A" },
            { key: "Phone:", value: admin.phoneNumber || "N/A" },
            { key: "Nationality:", value: admin.nationality || "N/A" },
            { key: "Blood Group:", value: admin.bloodGroup || "N/A" },
            { key: "Gender:", value: admin.gender || "N/A" },
            { key: "Father's Name:", value: admin.fatherName || "N/A" },
            { key: "Mother's Name:", value: admin.motherName || "N/A" },
            { key: "Date of Birth:", value: admin.dateOfBirth || "N/A" },
            { key: "Designation:", value: admin.member || "N/A" },
            { key: "Country:", value: admin.country || "N/A" },
        ];

        const detailsRight = [
            
            { key: "Division:", value: admin.division || "N/A" },
            { key: "District:", value: admin.district || "N/A" },
            { key: "Thana:", value: admin.thana || "N/A" },
            { key: "Post Office:", value: admin.postOffice || "N/A" },
            { key: "Ward:", value: admin.ward || "N/A" },
            { key: "City Corporation Ward:", value: admin.cityCorporationWard || "N/A" },
            { key: "Paurasabha Ward:", value: admin.paurasabhaWard || "N/A" },
            { key: "Reference ID:", value: admin.referenceId || "N/A" },
            { key: "Payment Method:", value: admin.payment || "N/A" },
            { key: "Transaction Id:", value: admin.transactionId || "N/A" },
            { key: "Pay Amount:", value: admin.totalAmount || "N/A" }
        ];

        doc.setFontSize(12); // Set the font size

        // Left Column with alternating row colors
        detailsLeft.forEach((item, index) => {
            const yOffset = profileImageBottomY + index * lineHeight;

            // Alternate row background colors
            const isEvenRow = index % 2 === 0;
            const rowBgColor = isEvenRow ? [219, 220, 220] : [255, 255, 255]; // Light gray for even, white for odd

            doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
            doc.rect(leftColumnX - 5, yOffset - 10, 85, lineHeight + 5, 'F'); // Background for the row

            doc.setFont("Times", "bold", 12);
            doc.setTextColor(34, 139, 34); // Green color for the keys
            doc.text(item.key, leftColumnX, yOffset);

            const valueWidth = doc.getTextWidth(item.value);
            const valueX = 105 - valueWidth - 5; // Align value to the right of the left column

            doc.setFont("Times", "normal", 12);
            doc.setTextColor(0, 0, 0); // Black color for values
            doc.text(item.value, valueX, yOffset);
        });

        // Right Column with alternating row colors
        detailsRight.forEach((item, index) => {
            const yOffset = profileImageBottomY + index * lineHeight;

            // Alternate row background colors
            const isEvenRow = index % 2 === 0;
            const rowBgColor = isEvenRow ? [219, 220, 220] : [255, 255, 255]; // Light gray for even, white for odd

            doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
            doc.rect(rightColumnX - 5, yOffset - 10, 85, lineHeight + 5, 'F'); // Background for the row

            doc.setFont("Times", "bold", 12);
            doc.setTextColor(34, 139, 34); // Green color for the keys
            doc.text(item.key, rightColumnX, yOffset);

            const valueWidth = doc.getTextWidth(item.value);
            const valueX = 210 - valueWidth - 30; // Align value to the right margin

            doc.setFont("Times", "normal", 12);
            doc.setTextColor(0, 0, 0); // Black color for values
            doc.text(item.value, valueX, yOffset);
        });

        // Watermark Image - Add first to place it behind text
        const watermarkUrl = "/watermarkLogo01.png"; // Add the watermark URL here
        const watermarkX = 55;  // Center horizontally
        const watermarkY = 120; // Position in the center of the page
        const watermarkWidth = 100; // Adjust the size of watermark
        const watermarkHeight = 100;

        // Add watermark image with transparency (ensure it's pre-made with low opacity)
        doc.addImage(watermarkUrl, "PNG", watermarkX, watermarkY, watermarkWidth, watermarkHeight, "50", "S");

        // ID & Date Section - Centered at the bottom with elegant spacing
        const idDateY = 270;
        doc.setFont("Times", "bold", 12);
        doc.setTextColor(34, 139, 34); // Green color for the ID
        doc.text("ID: " + (admin.profileId || "N/A"), 105, idDateY, null, null, "center");

        doc.setFont("Times", "normal", 10);
        doc.setTextColor(169, 169, 169); // Light gray color for the date
        doc.text(`Issued On: ${admin.createDate || "N/A"} ${admin.createTime || "N/A"}`, 105, idDateY + 10, null, null, "center");

        // Add the address at the bottom of the page, just above the ID & Date section
        const addressText = "119-120 Adamjee Court Annex -2, Motijheel 1000";
        const addressYPosition = 290; // Adjusted Y position for the address text

        doc.setFont("Times", "normal", 12);
        doc.setTextColor(0, 0, 0); // Black color for address text
        doc.text(addressText, 105, addressYPosition, null, null, "center");

        // Save the generated PDF
        doc.save("id-card-premium.pdf");
    };




    if (!admin) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 animate-gradient-x relative p-4 sm:p-8">
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-[url('/logo-watermark.svg')] bg-center bg-no-repeat opacity-10"></div>
    
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl ring-1 ring-emerald-500/20 relative overflow-hidden">
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
        
        {/* Corner Accents */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

        <div className="p-8 relative">
            {/* Header Section */}
            <div className="text-center mb-8 space-y-4">
                <div className="inline-block bg-gradient-to-r from-emerald-600 to-blue-500 p-1 rounded-full">
                    <div className="bg-white rounded-full px-6 py-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
                            Samadhan Group
                        </h1>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Official Registration</h2>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-spin-slow blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img
                        src={admin.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover relative z-10 hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{admin.fullName}</h3>
                    <p className="text-emerald-600 font-medium">{admin.member}</p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                    { label: "Email", value: admin.email, icon: "✉️" },
                    { label: "Phone", value: admin.phoneNumber, icon: "📱" },
                    { label: "Date of Birth", value: admin.dateOfBirth, icon: "🎂" },
                    { label: "Nationality", value: admin.nationality, icon: "🌍" },
                    { label: "Blood Group", value: admin.bloodGroup, icon: "🩸" },
                    { label: "Gender", value: admin.gender, icon: "⚥" },
                    { label: "Father's Name", value: admin.fatherName, icon: "👨" },
                    { label: "Mother's Name", value: admin.motherName, icon: "👩" },
                    { label: "Designation", value: admin.member, icon: "💼" },
                    { label: "Reference ID", value: admin.referenceId, icon: "🆔" },
                    { label: "Payment Method", value: admin.payment, icon: "💳" },
                    { label: "Transaction ID", value: admin.transactionId, icon: "📄" },
                    // Add other fields similarly
                ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                <p className="font-semibold text-gray-800">{item.value || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                        <p className="font-bold text-emerald-600">ID: {admin.profileId}</p>
                        <p className="text-sm text-gray-500">Issued: {admin.createDate} • {admin.createTime}</p>
                    </div>
                    <button
                        onClick={generatePDF}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white bg-black rounded-lg font-semibold hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export PDF
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default PersonalInfo;
