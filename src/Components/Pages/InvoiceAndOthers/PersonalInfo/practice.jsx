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
    

    // Watermark Image - Add first to place it behind text
    const watermarkUrl = "/watermarkLogo01.png"; // Add the watermark URL here
    const watermarkX = 55;  // Center horizontally
    const watermarkY = 120; // Position in the center of the page
    const watermarkWidth = 100; // Adjust the size of watermark
    const watermarkHeight = 100;

    // Add watermark image with transparency (ensure it's pre-made with low opacity)
    doc.addImage(watermarkUrl, "PNG", watermarkX, watermarkY, watermarkWidth, watermarkHeight, "50", "S");

      // Words Row (Space Between Layout) - Move this code block before the Samadhan Group title
const words = ["Unity", "Strength", "Progress", "Discipline", "Development", "Peace"];
const spaceBetweenX = 20; // Starting X position for the words
const rowWidth = 230; // Available width for the words
const wordSpacing = rowWidth / (words.length + 1); // Calculate space between each word

// Position the words row above the "Samadhan Group" title
const wordsYPosition = 18; // Set Y position for the words (just above the title)

// Add the words with space between
words.forEach((word, index) => {
    const xPosition = spaceBetweenX + index * wordSpacing;
    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Dark gray color for the words
    doc.text(word, xPosition, wordsYPosition); // Position the words above the title
});


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
    const x = 160;
    const y = 65;
    const diameter = 35;  // Adjusted diameter for the profile image to make it bigger
    
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
    const lineHeight = 15; // Increased line height for better readability

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
        { key: "Designation:", value: admin.member || "N/A" }
    ];

    const detailsRight = [
        { key: "Country:", value: admin.country || "N/A" },
        { key: "Division:", value: admin.division || "N/A" },
        { key: "District:", value: admin.district || "N/A" },
        { key: "Thana:", value: admin.thana || "N/A" },
        { key: "Post Office:", value: admin.postOffice || "N/A" },
        { key: "Ward:", value: admin.ward || "N/A" },
        { key: "City Corporation Ward:", value: admin.cityCorporationWard || "N/A" },
        { key: "Paurasabha Ward:", value: admin.paurasabhaWard || "N/A" },
        { key: "Reference ID:", value: admin.referenceId || "N/A" },
        { key: "Payment Method:", value: admin.payment || "N/A" }
    ];

    doc.setFontSize(12); // Set the font size

    // Left Column
    detailsLeft.forEach((item, index) => {
        const yOffset = profileImageBottomY + index * lineHeight;
        doc.setFont("Times", "bold", 12);
        doc.setTextColor(34, 139, 34); // Green color for the keys
        doc.text(item.key, leftColumnX, yOffset);

        const valueWidth = doc.getTextWidth(item.value);
        const valueX = 105 - valueWidth - 10; // Align value to the right of the left column

        doc.setFont("Times", "normal", 12);
        doc.setTextColor(0, 0, 0); // Black color for values
        doc.text(item.value, valueX, yOffset);
    });

    // Right Column
    detailsRight.forEach((item, index) => {
        const yOffset = profileImageBottomY + index * lineHeight;
        doc.setFont("Times", "bold", 12);
        doc.setTextColor(34, 139, 34); // Green color for the keys
        doc.text(item.key, rightColumnX, yOffset);

        const valueWidth = doc.getTextWidth(item.value);
        const valueX = 210 - valueWidth - 20; // Align value to the right margin

        doc.setFont("Times", "normal", 12);
        doc.setTextColor(0, 0, 0); // Black color for values
        doc.text(item.value, valueX, yOffset);
    });

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
                    {/* Display user details */}
                    {[{ label: "Name", value: admin.fullName },
                    { label: "Email", value: admin.email },
                    { label: "Phone", value: admin.phoneNumber },
                    { label: "Nationality", value: admin.nationality },
                    { label: "Blood Group", value: admin.bloodGroup },
                    { label: "Gender", value: admin.gender },
                    { label: "Father's Name", value: admin.fatherName },
                    { label: "Mother's Name", value: admin.motherName },
                    { label: "Date of Birth", value: admin.dateOfBirth },
                    { label: "Designation", value: admin.member },
                    { label: "Country", value: admin.country },
                    { label: "Division", value: admin.division },
                    { label: "District", value: admin.district },
                    { label: "Thana", value: admin.thana },
                    { label: "Post Office", value: admin.postOffice },
                    { label: "Ward", value: admin.ward },
                    { label: "City Corporation Ward", value: admin.cityCorporationWard || "N/A" },
                    { label: "Paurasabha Ward", value: admin.paurasabhaWard || "N/A" },
                    { label: "Reference ID", value: admin.referenceId },
                    { label: "Payment Method", value: admin.payment },
                    { label: "Transaction ID", value: admin.transactionId },
                    { label: "Pay Amount", value: admin.totalAmount },
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <p className="font-semibold text-green-600">{item.label}:</p>
                            <p>{item.value}</p>
                        </div>
                    ))}
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

export default PersonalInfo;
