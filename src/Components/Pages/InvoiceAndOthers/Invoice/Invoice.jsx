import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-details/${id}`);
        const data = await response.json();
        setAdmin(data);
        // Calculate total amount directly from the admin object
        calculateTotalAmount(data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    fetchAdminDetails();
  }, [id]);

  const calculateTotalAmount = (admin) => {
    // Ensure totalAmount is a number
    const total = parseFloat(admin.totalAmount) || 0;
    setTotalAmount(total);
  };

  if (!admin) return <div className="text-center text-lg text-gray-600">Loading invoice...</div>;

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let y = margin;

    // Color Scheme
    const primaryColor = [6, 17, 97]; // Navy Blue
    const accentColor = [241, 90, 34]; // Coral
    const darkText = [33, 37, 41]; // Dark Gray
    const lightText = [108, 117, 125]; // Medium Gray

    // Add Watermark
    // doc.setFillColor(238, 238, 238);
    // doc.setFontSize(30);
    // doc.setTextColor(238, 238, 238);
    // doc.text("SAMADHAN Group", pageWidth / 3, 140, { angle: 45 });

    // Header Section
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Logo and Branding
    const logoImg = new Image();
    logoImg.src = '/logo01.png'; // Update with your logo path
    doc.addImage(logoImg, 'PNG', margin, 12, 20, 20);
    
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Samadhan Group", margin + 25, 20);
    doc.setFontSize(8);
    doc.text("119-120 Adamjee Court Annex -2, Motijheel 1000, Dhaka", margin + 25, 25);
    doc.text("01690017320 | info@samadhan.com", margin + 25, 30);

    // Invoice Title
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("INVOICE", pageWidth - margin - 25, 22);

    // Invoice Details
    doc.setFontSize(8);
    doc.text(`Invoice No: ${generateMemoNumber()}`, pageWidth - margin - 25, 29);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin - 25, 33);

    y = 55; // Reset Y position after header

    // Member Information
    doc.setFontSize(14);
    doc.setTextColor(...darkText);
    doc.setFont("helvetica", "bold");
    doc.text("BILLED TO:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(admin.fullName, margin, y + 6);
    doc.text(admin.email, margin, y + 11);
    doc.text(admin.phoneNumber, margin, y + 16);
    doc.text(admin.member, margin, y + 21);
    y += 40;

    // Table Title
doc.setFontSize(18);
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text(admin.member, pageWidth / 2, y, { align: 'center' }); // Centered horizontally
y += 10;
    // Table Header
    doc.setFillColor(...primaryColor);
    
    const columns = [
        { header: "Serial No", width: 30 },
        { header: "Name", width: 100 },
        // { header: "Fee/Charge", width: 50 },
        { header: "Amount", width: 40 },
    ];

    // Draw Table Header
    let x = margin;
    
    columns.forEach((col) => {
        doc.setFillColor(...primaryColor);
        
        doc.rect(x, y, col.width, 12, "FD"); // FD = Fill + Stroke
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(col.header, x + col.width / 2, y + 8, { align: 'center' });
        x += col.width;
    });
    y += 12;

    // Table Row Data
    doc.setFontSize(10);
    doc.setTextColor(...darkText);
    const rowData = [
        { serialNo: 1, name: "Organizer Fee",  amount: admin.organizerFee },
        { serialNo: 2, name: "Registration Fee",amount: admin.registrationFee },
        { serialNo: 3, name: "ID Card Charge", amount: admin.idCardFee },
        { serialNo: 4, name: "Service Charge",amount: admin.serviceFee },
    ];

    rowData.forEach((data) => {
        x = margin;
        columns.forEach((col, index) => {
            doc.setFillColor(245, 245, 245);
            doc.rect(x, y, col.width, 10, "F");
            doc.setTextColor(...darkText);
            doc.setFontSize(12);
            let text = "";
            switch (index) {
                case 0:
                    text = data.serialNo;
                    break;
                case 1:
                    text = data.name;
                    break;
                // case 2:
                //     text = data.fee;
                //     break;
                case 2:
                    text = data.amount;
                    break;
            }
            doc.text(text.toString(), x + col.width / 2, y + 7, { align: 'center' });
            x += col.width;
        });
        y += 10;
    });


     // Watermark Image - Add first to place it behind text
     const watermarkUrl = "/watermarkLogo01.png"; // Add the watermark URL here
     const watermarkX = 55;  // Center horizontally
     const watermarkY = 150; // Position in the center of the page
     const watermarkWidth = 120; // Adjust the size of watermark
     const watermarkHeight = 120;

     // Add watermark image with transparency (ensure it's pre-made with low opacity)
     doc.addImage(watermarkUrl, "PNG", watermarkX, watermarkY, watermarkWidth, watermarkHeight, "50", "S");

    // Total Amount Row
    y += 5;
    doc.setFillColor(...primaryColor);
    doc.rect(pageWidth - margin - 100, y, 90, 12, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("Total Amount", pageWidth - margin - 85, y + 8);
    doc.text(`${totalAmount}`, pageWidth - margin - 15, y + 8, { align: 'right' });

    // Payment Method
    y += 28;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightText);
    doc.text(`Payment Method: ${admin.payment}`, pageWidth - margin - 60, y);
    y += 8;
    doc.text(`Payment Transaction Id: ${admin.transactionId}`, pageWidth - margin - 60, y);
    y += 8;
    doc.text(`Payment Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin - 60, y);

    // Terms and Footer
    // y = 280; // Near bottom of A4 page
    // doc.setDrawColor(...lightText);
    // doc.line(margin, y, pageWidth - margin, y);
    // y += 5;
    // doc.setFontSize(8);
    // doc.setTextColor(...lightText);
    // doc.text("Terms & Conditions:", margin, y);
    // doc.text("1. Payment due within 15 days of invoice date", margin, y + 5);
    // doc.text("2. Late payments subject to 2% monthly interest", margin, y + 10);
    
    // Save PDF
    doc.save(`invoice_${generateMemoNumber()}.pdf`);
};



  // Helper function to generate a Memo Number
  const generateMemoNumber = () => {
    return "M" + Math.floor(Math.random() * 100000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default Invoice;