import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for error messages
import axios from "axios";
import { AuthContext } from "../../../Components/Authentication/AuthProvider/AuthProvider";

const Create_Member = () => {
  const { signUpUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate(); // For redirect after successful signup
  const [membershipType, setMembershipType] = useState('');
  const [createDate, setCreateDate] = useState(''); // Assuming you have this as part of your form
  const [endDate, setEndDate] = useState(''); // This will hold the dynamically calculated endDate
  const [membershipCost, setMembershipCost] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [paurasabhaWards, setpaurasabhaWards] = useState([]);
  const [cityCorporationWards, setcityCorporationWards] = useState([]);
  const [postOffices, setPostOffices] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedMemberType, setSelectedMemberType] = useState('');

  const [selectedThana, setSelectedThana] = useState('');
  const [selectedpaurasabhaWards, setSelectedpaurasabhaWards] = useState('');
  const [selectedcityCorporationWards, setSelectedcityCorporationWards] = useState('');
  const [selectedPostOffice, setSelectedPostOffice] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [customThana, setCustomThana] = useState('');
  const [custompaurasabhaWards, setCustompaurasabhaWards] = useState('');
  const [customselectedcityCorporationWards, setCustomselectedcityCorporationWards] = useState('');
  const [customPostOffice, setCustomPostOffice] = useState('');
  const [customWard, setCustomWard] = useState('');

  const [userData, setUserData] = useState(null);


  const divisionDistricts = {
    "Barisal": ["Barisal", "Bhola", "Barguna", "Jhalokathi", "Patuakhali", "Pirojpur"],
    "Chattogram": ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
    "Dhaka": ["Dhaka", "Gazipur", "Narsingdi", "Manikganj", "Munshiganj", "Narayanganj", "Mymensingh", "Sherpur", "Jamalpur", "Netrokona", "Kishoreganj", "Tangail", "Faridpur", "Maradipur", "Shariatpur", "Rajbari", "Gopalganj"],
    "Khulna": ["Khulna", "Bagherhat", "Sathkhira", "Jessore", "Magura", "Jhenaidah", "Narail", "Kushtia", "Chuadanga", "Meherpur"],
    "Rajshahi": ["Rajshahi", "Naogaon", "Natore", "Nawabganj", "Pabna", "Sirajganj", "Bogra", "Joypurhat"],
    "Rangpur": ["Rangpur", "Gaibandha", "Nilphamari", "Kurigram", "Lalmonirhat", "Dinajpur", "Thakurgaon", "Panchagarh"],
    "Sylhet": ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    "Mymensingh": ["Tangail", "Jamalpur", "Mymensingh", "Kishoreganj", "Sherpur", "Netrokona"],
  };



  useEffect(() => {
    // Fetch data from API or use hardcoded data
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/signup');
      const data = response.data;

      // Assuming `data` contains arrays of thana, postOffice, and ward
      const thanas = data.map(item => item.thana);
      const postOffices = data.map(item => item.postOffice);
      const wards = data.map(item => item.ward);
      const selectedcityCorporationWards = data.map(item => item.cityCorporationWard);
      const selectedpaurasabhaWards = data.map(item => item.paurasabhaWard);

      // Remove duplicates using Set
      setThanas([...new Set(thanas)]);
      setPostOffices([...new Set(postOffices)]);
      setWards([...new Set(wards)]);
      setcityCorporationWards([...new Set(selectedcityCorporationWards)]);
      setpaurasabhaWards([...new Set(selectedpaurasabhaWards)]);
    };

    fetchData();
  }, []);

  // Handle Select Change for Thana, Post Office, and Ward
  const handleSelectChange = (e, field) => {
    const { value } = e.target;
    if (field === 'thana') setSelectedThana(value);
    else if (field === 'postOffice') setSelectedPostOffice(value);
    else if (field === 'ward') setSelectedWard(value);
    else if (field === 'cityCorporationWard') setSelectedcityCorporationWards(value);
    else if (field === 'paurasabhaWard') setSelectedpaurasabhaWards(value);
  };

  // Handle custom input change
  const handleCustomChange = (e, field) => {
    const { value } = e.target;
    if (field === 'thana') setCustomThana(value);
    else if (field === 'postOffice') setCustomPostOffice(value);
    else if (field === 'ward') setCustomWard(value);
    else if (field === 'cityCorporationWard') setCustomselectedcityCorporationWards(value);
    else if (field === 'paurasabhaWard') setCustompaurasabhaWards(value);
  };






  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    image: "",
    password: "",
    confirmPassword: "",
    general: "",  // General error for form-wide issues
    membershipType: "",
    membershipCost: "",

  });
  const [imagePreview, setImagePreview] = useState(null);
  const [nidBirthImagePreview, setNidBirthImagePreview] = useState(null);
  const [paymentPhotoPreview, setPaymentPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the form submission


  const calculateEndDate = (selectedMembershipType) => {
    const currentDate = new Date(); // Get current date
    let newEndDate = new Date(currentDate); // Make a copy to avoid modifying the original date

    switch (selectedMembershipType) {
      case 'monthly':
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        break;
      case 'half_yearly':
        newEndDate.setMonth(newEndDate.getMonth() + 6);
        break;
      case 'yearly':
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
      case 'lifetime':
        newEndDate.setFullYear(newEndDate.getFullYear() + 10);
        break;
      default:
        break;
    }

    // Format the endDate in YYYY-MM-DD format
    setEndDate(newEndDate.toISOString().split('T')[0]);
  };

  // Handle membership type change and calculate endDate
  const handleMembershipTypeChange = (e) => {
    const selectedType = e.target.value;
    setMembershipType(selectedType);
    calculateEndDate(selectedType);

    // Set the membership cost based on membership type
    switch (selectedType) {
      case 'monthly':
        setMembershipCost('300');
        break;
      case 'half_yearly':
        setMembershipCost('500');
        break;
      case 'yearly':
        setMembershipCost('900');
        break;
      case 'lifetime':
        setMembershipCost('5000');
        break;
      default:
        setMembershipCost('');
    }
  };




  // Basic form validation function
  const validateForm = (formData) => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (allowing both 10 or 11 digits)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (10 or 11 digits)";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|;:'",.<>?/~`]).{6,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long, include at least one letter, one number, and one special character";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check for other fields
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.nationality) newErrors.nationality = "Nationality is required";

    // Image validation
    if (!formData.image) {
      newErrors.image = "Profile image is required";
    } else if (formData.image && !formData.image.type.startsWith("image/")) {
      newErrors.image = "File must be an image";
    }

    if (!formData.membershipType) {
      newErrors.membershipType = "Membership Type is required";
    }

    if (!formData.membershipCost) {
      newErrors.membershipCost = "Membership Cost is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileId = "SG" + Math.floor(1000000000 + Math.random() * 9000000000); // Generates a random 10-digit number after "SG", making a total of 12 digits

    // Manually extract form values from e.target
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;
    const nationality = e.target.nationality.value;
    const image = e.target.image.files[0];  // For file input, use `files[0]`
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const role = "user";
    const fatherName = e.target.fatherName.value;
    const motherName = e.target.motherName.value;
    const nidNumber = e.target.nidNumber.value;
    const gender = e.target.gender.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const bloodGroup = e.target.bloodGroup.value;
    const referenceId = e.target.referenceId.value;
    const country = e.target.country.value;
    const division = e.target.division.value;
    const district = e.target.district.value;
    // Handle thana, post office, and ward
    const thana = selectedThana === 'Other' ? customThana : selectedThana;
    const postOffice = selectedPostOffice === 'Other' ? customPostOffice : selectedPostOffice;
    const ward = selectedWard === 'Other' ? customWard : selectedWard;
    const village = e.target.village.value;
    const member = e.target.member.value;
    const nidBirthImage = e.target.nidBirthImage.files[0];  // For file input, use `files[0]`
    const paymentPhoto = e.target.paymentPhoto.files[0];  // For file input, use `files[0]`
    const payment = e.target.payment.value;
    const transactionId = e.target.transactionId.value;
    const cityCorporationWard = selectedcityCorporationWards === 'Other' ? customselectedcityCorporationWards : selectedcityCorporationWards;
    const paurasabhaWard = selectedpaurasabhaWards === 'Other' ? custompaurasabhaWards : selectedpaurasabhaWards;
    const aproval = "pending";
    const membershipData = {
      membershipType,
      membershipCost,
      endDate,
    };

    const organizerFee = e.target.organizerFee.value;
    const registrationFee = e.target.registrationFee.value;
    const idCardFee = e.target.idCardFee.value;
    const serviceFee = e.target.serviceFee.value;
    const totalAmount = e.target.totalAmount.value;



    // Get the current date and time
    const currentDateTime = new Date();

    // Format the current date (MM/DD/YYYY)
    const createDate = currentDateTime.toLocaleDateString();  // e.g., "12/31/2024"

    // Format the current time (hh:mm AM/PM)
    const createTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });  // e.g., "03:45 PM"

    const formData = {
      fullName,
      email,
      phoneNumber,
      nationality,
      role,
      image,  // Store the image file here
      password,
      confirmPassword,
      fatherName,
      motherName,
      nidNumber,
      gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, ward, nidBirthImage, member, payment, transactionId, cityCorporationWard, paurasabhaWard, paymentPhoto, profileId, aproval,
      createDate,  // Store the formatted date
      createTime,  // Store the formatted time
      ...membershipData, // Include membership type and cost in form data
      organizerFee, registrationFee, idCardFee, serviceFee, totalAmount,


    };

    // Validate form before submission
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If there are no errors, proceed with signup
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);  // Start loading state
        setErrors({ ...errors, general: "" }); // Reset general errors before submission

        // Upload Profile Image to ImgBB
        const profileImageFormData = new FormData();
        profileImageFormData.append('image', image);
        const profileImageResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`, profileImageFormData);
        const profileImageUrl = profileImageResponse.data.data.display_url;

        // Upload Nid/Birth Photo to ImgBB
        const nidBirthImageFormData = new FormData();
        nidBirthImageFormData.append('image', image);
        const nidBirthImageResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`, nidBirthImageFormData);
        const nidBirthImageUrl = nidBirthImageResponse.data.data.display_url;

        // Upload Payment Photo to ImgBB
        const paymentPhotoFormData = new FormData();
        paymentPhotoFormData.append('image', image);
        const paymentPhotoResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`, paymentPhotoFormData);
        const paymentPhotoUrl = paymentPhotoResponse.data.data.display_url;



        // Create the user data object with the image URL
        const userData = {
          fullName,
          email,
          phoneNumber,
          nationality,
          role,
          image: profileImageUrl,  // Use the image URL from ImgBB
          password,
          confirmPassword,
          fatherName,
          motherName,
          nidNumber,
          gender, dateOfBirth, bloodGroup, referenceId, country, division, district, thana, postOffice, village, ward, cityCorporationWard, paurasabhaWard,
          nidBirthImage: nidBirthImageUrl,
          member,
          payment, transactionId,
          paymentPhoto: paymentPhotoUrl,
          profileId, aproval,
          organizerFee, registrationFee, idCardFee, serviceFee, totalAmount,
          createDate,  // Include the createDate
          createTime, ...membershipData, // Include membership type and cost in form datas  // Include the createTime
        };

        // Send data to backend to create a new user
        const response = await axios.post('http://localhost:5000/signup', userData);

        if (response.data.success) {
          // Proceed with signup using the signUpUser function
          const result = await signUpUser(email, password);

          // Once signUp is successful, set the user context
          setUser(result.user);  // Assuming result contains the user object

          setLoading(false);  // Stop loading state
          toast.success("Member Create successful!");  // Show success message
          navigate("/dashboard/manage-members");  // Redirect to homepage/dashboard (or any other page)
        }

        // Reset form after successful signup
        e.target.reset();
        setImagePreview(null);  // Clear image preview
        setNidBirthImagePreview(null);
        setPaymentPhotoPreview(null);
        setLoading(false);  // Stop loading state
      } catch (error) {
        setLoading(false);  // Stop loading state
        setErrors({ ...errors, general: error.message });  // Set general error message if any
        toast.error(error.message);  // Show error message in toast
        navigate("/dashboard/manage-members");
      }
    }
  };


  // Handle file input for image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setErrors({ ...errors, image: "File size exceeds 2MB" });
        setImagePreview(null);  // Clear preview on error
      } else if (!file.type.startsWith("image/")) { // Check if it's an image file
        setErrors({ ...errors, image: "Only image files are allowed" });
        setImagePreview(null);  // Clear preview on error
      } else {
        setErrors({ ...errors, image: "" });  // Clear error if valid image
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };


  // Handle file input for image preview
  const handleNidBirthImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setErrors({ ...errors, nidBirthImage: "File size exceeds 2MB" });
        setNidBirthImagePreview(null);  // Clear preview on error
      } else if (!file.type.startsWith("image/")) { // Check if it's an image file
        setErrors({ ...errors, nidBirthImage: "Only image files are allowed" });
        setNidBirthImagePreview(null);  // Clear preview on error
      } else {
        setErrors({ ...errors, nidBirthImage: "" });  // Clear error if valid image
        setNidBirthImagePreview(URL.createObjectURL(file));
      }
    }
  };



  // Handle file input for image preview
  const handlePaymentPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setErrors({ ...errors, paymentPhoto: "File size exceeds 2MB" });
        setPaymentPhotoPreview(null);  // Clear preview on error
      } else if (!file.type.startsWith("image/")) { // Check if it's an image file
        setErrors({ ...errors, paymentPhoto: "Only image files are allowed" });
        setPaymentPhotoPreview(null);  // Clear preview on error
      } else {
        setErrors({ ...errors, paymentPhoto: "" });  // Clear error if valid image
        setPaymentPhotoPreview(URL.createObjectURL(file));
      }
    }
  };

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);

    // Conditionally setting the payment details based on the selected payment method
    if (selectedPaymentMethod === "Bkash") {
      setPaymentDetails("+08801690017320");
    } else if (selectedPaymentMethod === "Nagad") {
      setPaymentDetails("+0880192345678");
    } else if (selectedPaymentMethod === "Rocket") {
      setPaymentDetails("+0880176543210");
    } else if (selectedPaymentMethod === "Bank") {
      setPaymentDetails("AC-3827483274235832478 (branch: Motijheel, Dhaka)");
    } else if (selectedPaymentMethod === "Cash") {
      setPaymentDetails("Please pay in cash at the nearest office.");
    } else {
      setPaymentDetails(""); // Clear payment details if no valid option is selected
    }
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setDistricts(divisionDistricts[division] || []);
  };




  return (
    <div className="flex justify-center  items-center min-h-screen ">
      <div className="w-full max-w-5xl p-8 my-10 rounded-lg shadow-lg bg-gray-100 text-gray-800">
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Create Member Account</h2>

        {/* Display General Error */}
        {errors.general && (
          // <div className="mb-4 text-red-400 text-center">{errors.general}</div>
          <div className="mb-4 text-red-400 text-center"><span className="font-bold">Create Member Successfully....</span></div>
        )}




        <form onSubmit={handleSubmit} className=" space-y-6">
          {/* Full Name, Email and Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm text-gray-800">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-md ${errors.fullName ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-800">Email</label>
              <input type="email" id="email" name="email" placeholder="leroy@jenkins.com"
                className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm text-gray-800">Phone Number</label>
              <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Your phone number"
                className={`w-full px-4 py-2 border rounded-md ${errors.phoneNumber ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.phoneNumber && <span className="text-xs text-red-400">{errors.phoneNumber}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="nationality" className="block text-sm text-gray-800">Nationality</label>
              <input type="text" id="nationality" name="nationality" placeholder="Your nationality"
                className={`w-full px-4 py-2 border rounded-md ${errors.nationality ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.nationality && <span className="text-xs text-red-400">{errors.nationality}</span>}
            </div>
          </div>

          {/* Father Name, Mother Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fatherName" className="block text-sm text-gray-800">Father's Name</label>
              <input type="text" id="fatherName" name="fatherName" placeholder="Father's Name"
                className={`w-full px-4 py-2 border rounded-md ${errors.fatherName ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.fatherName && <span className="text-xs text-red-400">{errors.fatherName}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="motherName" className="block text-sm text-gray-800">Mother's Name</label>
              <input type="text" id="motherName" name="motherName" placeholder="Mother's Name"
                className={`w-full px-4 py-2 border rounded-md ${errors.motherName ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.motherName && <span className="text-xs text-red-400">{errors.motherName}</span>}
            </div>
          </div>

          {/* NID, Gender, Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="nidNumber" className="block text-sm text-gray-800">NID Number</label>
              <input type="text" id="nidNumber" name="nidNumber" placeholder="NID Number"
                className={`w-full px-4 py-2 border rounded-md ${errors.nidNumber ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.nidNumber && <span className="text-xs text-red-400">{errors.nidNumber}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm text-gray-800">Gender</label>
              <select id="gender" name="gender"
                className={`w-full px-4 py-2 border rounded-md ${errors.gender ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-xs text-red-400">{errors.gender}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm text-gray-800">Date of Birth</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth"
                className={`w-full px-4 py-2 border rounded-md ${errors.dateOfBirth ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.dateOfBirth && <span className="text-xs text-red-400">{errors.dateOfBirth}</span>}
            </div>
          </div>

          {/* Blood Group, Reference ID, Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="bloodGroup" className="block text-sm text-gray-800">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                className={`w-full px-4 py-2 border rounded-md ${errors.bloodGroup ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}>
                <option value="" disabled >Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && <span className="text-xs text-red-400">{errors.bloodGroup}</span>}
            </div>


            <div className="space-y-2">
              <label htmlFor="referenceId" className="block text-sm text-gray-800">Reference ID</label>
              <input type="text" id="referenceId" name="referenceId" placeholder="Reference ID"
                className={`w-full px-4 py-2 border rounded-md ${errors.referenceId ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.referenceId && <span className="text-xs text-red-400">{errors.referenceId}</span>}
            </div>




          </div>


          {/* Division, District*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm text-gray-800">Country</label>
              <input type="text" id="country" name="country" placeholder="Country" value={"Bangladesh"} readOnly
                className={`w-full px-4 py-2 border rounded-md ${errors.country ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.country && <span className="text-xs text-red-400">{errors.country}</span>}
            </div>

            <div className="space-y-2">
              {/* Division Dropdown */}

              <label htmlFor="division" className="block text-sm text-gray-800">Division</label>
              <select
                id="division"
                name="division"
                value={selectedDivision}
                onChange={handleDivisionChange}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="" disabled>Select Division</option>
                {Object.keys(divisionDistricts).map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && <span className="text-xs text-red-500 mt-1">{errors.division}</span>}


            </div>


            {/* District Dropdown */}
            <div className="space-y-2">
              <label htmlFor="district" className="block text-sm text-gray-800">District</label>
              <select
                id="district"
                name="district"
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="" disabled>Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && <span className="text-xs text-red-500 mt-1">{errors.district}</span>}
            </div>

          </div>




          {/* City corporation ward, paurasabha ward */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="space-y-2">
              <label htmlFor="cityCorporationWard" className="block text-sm text-gray-800">City Corporation Ward</label>
              <select
                id="cityCorporationWard"
                name="cityCorporationWard"
                value={selectedcityCorporationWards}
                onChange={(e) => handleSelectChange(e, 'cityCorporationWard')}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="">Select City Corporation Ward</option>
                {cityCorporationWards.map((cityCorporationWard, index) => (
                  <option key={index} value={cityCorporationWard}>{cityCorporationWard}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {selectedcityCorporationWards === 'Other' && (
                <input
                  type="text"
                  value={customselectedcityCorporationWards}
                  onChange={(e) => handleCustomChange(e, 'cityCorporationWard')}
                  placeholder="Enter custom City Corporation Ward"
                  className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
                />
              )}
            </div>




            <div className="space-y-2">
              <label htmlFor="paurasabhaWard" className="block text-sm text-gray-800">Paurasabha Ward</label>
              <select
                id="paurasabhaWard"
                name="paurasabhaWard"
                value={selectedpaurasabhaWards}
                onChange={(e) => handleSelectChange(e, 'paurasabhaWard')}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="">Select Paurasabha Ward</option>
                {paurasabhaWards.map((paurasabhaWard, index) => (
                  <option key={index} value={paurasabhaWard}>{paurasabhaWard}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {selectedpaurasabhaWards === 'Other' && (
                <input
                  type="text"
                  value={custompaurasabhaWards}
                  onChange={(e) => handleCustomChange(e, 'paurasabhaWard')}
                  placeholder="Enter custom Paurasabha Ward"
                  className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
                />
              )}
            </div>

          </div>



          {/* Post Office, Village */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="space-y-2">
              <label htmlFor="thana" className="block text-sm text-gray-800">Thana</label>
              <select
                id="thana"
                name="thana"
                value={selectedThana}
                onChange={(e) => handleSelectChange(e, 'thana')}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="">Select Thana</option>
                {thanas.map((thana, index) => (
                  <option key={index} value={thana}>{thana}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {selectedThana === 'Other' && (
                <input
                  type="text"
                  value={customThana}
                  onChange={(e) => handleCustomChange(e, 'thana')}
                  placeholder="Enter custom Thana"
                  className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
                />
              )}
            </div>


            <div className="space-y-2">
              <label htmlFor="postOffice" className="block text-sm text-gray-800">Post Office</label>
              <select
                id="postOffice"
                name="postOffice"
                value={selectedPostOffice}
                onChange={(e) => handleSelectChange(e, 'postOffice')}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="">Select Post Office</option>
                {postOffices.map((postOffice, index) => (
                  <option key={index} value={postOffice}>{postOffice}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {selectedPostOffice === 'Other' && (
                <input
                  type="text"
                  value={customPostOffice}
                  onChange={(e) => handleCustomChange(e, 'postOffice')}
                  placeholder="Enter custom Post Office"
                  className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
                />
              )}
            </div>


            <div className="space-y-2">
              <label htmlFor="ward" className="block text-sm text-gray-800">Ward</label>
              <select
                id="ward"
                name="ward"
                value={selectedWard}
                onChange={(e) => handleSelectChange(e, 'ward')}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="">Select Ward</option>
                {/* {wards.map((ward, index) => (
                  <option key={index} value={ward}>{ward}</option>
                ))} */}
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                <option value="">6</option>
                <option value="">7</option>
                <option value="">8</option>
                <option value="">9</option>
                <option value="">10</option>
                <option value="">11</option>
                <option value="">12</option>
                <option value="">13</option>
                <option value="">14</option>
                <option value="">15</option>


                <option value="Other">Other</option>
              </select>
              {selectedWard === 'Other' && (
                <input
                  type="text"
                  value={customWard}
                  onChange={(e) => handleCustomChange(e, 'ward')}
                  placeholder="Enter custom Ward"
                  className="w-full mt-2 px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
                />
              )}
            </div>






            <div className="space-y-2">
              <label htmlFor="village" className="block text-sm text-gray-800">Village</label>
              <input type="text" id="village" name="village" placeholder="Village"
                className={`w-full px-4 py-2 border rounded-md ${errors.village ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.village && <span className="text-xs text-red-400">{errors.village}</span>}
            </div>

          </div>

          {/* Profile Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            {<div className="space-y-2">
              <label htmlFor="image" className="block text-sm text-gray-800">Profile Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full px-4 py-2 border rounded-md ${errors.image ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
              {errors.image && <span className="text-xs text-red-400">{errors.image}</span>}
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                </div>
              )}
            </div>}




            {/* Nid/Birth Image Upload */}
            {<div className="space-y-2">
              <label htmlFor="image" className="block text-sm text-gray-800">NID/Birth Certificate Image</label>
              <input
                type="file"
                id="nidBirthImage"
                name="nidBirthImage"
                accept="image/*"
                onChange={handleNidBirthImageChange}
                className={`w-full px-4 py-2 border rounded-md ${errors.nidBirthImage ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
              {errors.nidBirthImage && <span className="text-xs text-red-400">{errors.nidBirthImage}</span>}
              {nidBirthImagePreview && (
                <div className="mt-2">
                  <img src={nidBirthImagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                </div>
              )}
            </div>}




          </div>


          {/* Member,Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
              <input type="password" id="password" name="password" placeholder="Password"
                className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm text-gray-800">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.confirmPassword && <span className="text-xs text-red-400">{errors.confirmPassword}</span>}
            </div>



          </div>






          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


            <div className="space-y-2">
              <label htmlFor="member" className="block text-sm text-gray-800">Member Type</label>
              <select
                id="member"
                name="member"
                value={selectedMemberType}
                onChange={(e) => setSelectedMemberType(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${errors.member ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              >
                <option value="" disabled>Select Member Type</option>
                <option value="General Member">General Member</option>
                <option value="Central chief Organizer">Central chief Organizer</option>
                <option value="Central Organizer">Central Organizer</option>
                <option value="Divisional Chief Organizer">Divisional Chief Organizer</option>
                <option value="Divisional Organizer">Divisional Organizer</option>
                <option value="District Chief Organizer">District Chief Organizer</option>
                <option value="District Organizer">District Organizer</option>
                <option value="City Corporation Ward Organizer">City Corporation Ward Organizer</option>
                <option value="Paurasabha Ward Organizer">Paurasabha Ward Organizer</option>
                <option value="Upazila Chief Organizer">Upazila Chief Organizer</option>
                <option value="Upazila Organizer">Upazila Organizer</option>
                <option value="Union Organizer">Union Organizer</option>
                <option value="Ward Organizer">Ward Organizer</option>
              </select>
            </div>


            {selectedMemberType !== "General Member" && (
              <div className="space-y-2">
                <label htmlFor="organizerFee" className="block text-sm text-gray-800">Organizer Fee</label>
                <input
                  type="number"
                  id="organizerFee"
                  name="organizerFee"
                  value={30000}
                  readOnly
                  className={`w-full px-4 py-2 border rounded-md ${errors.organizerFee ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
                />
              </div>
            )}



            <div className="space-y-2">
              <label htmlFor="membershipType" className="block text-sm text-gray-800">Subscription Time</label>
              <select
                id="membershipType"
                name="membershipType"
                value={membershipType}
                onChange={handleMembershipTypeChange}
                className={`w-full px-4 py-2 border rounded-md ${errors.membershipType ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}>
                <option value="" disabled>Select Subscription Time</option>
                <option value="monthly">Monthly</option>
                {/* <option value="half_yearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Life Time</option> */}
              </select>
              {errors.membershipType && <span className="text-xs text-red-400">{errors.membershipType}</span>}
            </div>


            <div className="space-y-2">
              <label htmlFor="membershipCost" className="block text-sm text-gray-800">Subscription Fee</label>
              <input
                type="text"
                id="membershipCost"
                name="membershipCost"
                value={membershipCost}
                disabled
                className={`w-full px-4 py-2 border rounded-md ${errors.membershipCost ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
              {errors.membershipCost && <span className="text-xs text-red-400">{errors.membershipCost}</span>}
            </div>



          </div>



          {/* {registration fee, Id card fee, Service charge fee} */}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <div className="space-y-2">
              <label htmlFor="registrationFee" className="block text-sm text-gray-800">Registration Fee</label>
              <input type="number" id="registrationFee" name="registrationFee" placeholder="Registration Fee" value={100} readOnly
                className={`w-full px-4 py-2 border rounded-md ${errors.registrationFee ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.registrationFee && <span className="text-xs text-red-400">{errors.registrationFee}</span>}
            </div>



            <div className="space-y-2">
              <label htmlFor="idCardFee" className="block text-sm text-gray-800">ID Card Fee</label>
              <input type="number" id="idCardFee" name="idCardFee" placeholder="Id Card Fee" value={250} readOnly
                className={`w-full px-4 py-2 border rounded-md ${errors.idCardFee ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.idCardFee && <span className="text-xs text-red-400">{errors.idCardFee}</span>}
            </div>




            <div className="space-y-2">
              <label htmlFor="serviceFee" className="block text-sm text-gray-800">Service Fee</label>
              <input type="number" id="serviceFee" name="serviceFee" placeholder="service Fee" value={200} readOnly
                className={`w-full px-4 py-2 border rounded-md ${errors.serviceFee ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.serviceFee && <span className="text-xs text-red-400">{errors.serviceFee}</span>}
            </div>


            {/* total amount  */}

            <div className="space-y-2">
              <label htmlFor="totalAmount" className="block text-sm text-gray-800">Total Amount</label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={
                  (selectedMemberType !== "General Member" ? 30000 : 0) +
                  (parseInt(membershipCost) || 0) +
                  100 + // Registration Fee
                  250 + // ID Card Fee
                  200   // Service Fee
                }
                readOnly
                className={`w-full px-4 py-2 border rounded-md ${errors.totalAmount ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
            </div>


            {/* End Date */}
            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm text-gray-800">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                disabled
                className={`w-full px-4 py-2 border rounded-md ${errors.endDate ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
              {errors.endDate && <span className="text-xs text-red-400">{errors.endDate}</span>}
            </div>


          </div>




          {/* Trax ID, Payment prof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Payment Method */}
            <div className="space-y-2">
              <label htmlFor="payment" className="block text-sm text-gray-800">Payment Method</label>
              <select
                id="payment"
                name="payment"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full px-4 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none"
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Bkash">Bkash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>
            </div>


            <div className="space-y-2">
              <label htmlFor="transactionId" className="block text-sm text-gray-800">transaction ID/Serial No</label>
              <input type="text" id="transactionId" name="transactionId" placeholder="Transaction ID / Serial No"
                className={`w-full px-4 py-2 border rounded-md ${errors.transactionId ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`} />
              {errors.transactionId && <span className="text-xs text-red-400">{errors.transactionId}</span>}
            </div>

            {/* Payment Image Upload */}
            {<div className="space-y-2">
              <label htmlFor="image" className="block text-sm text-gray-800">Payment Proof Image</label>
              <input
                type="file"
                id="paymentPhoto"
                name="paymentPhoto"
                accept="image/*"
                onChange={handlePaymentPhotoChange}
                className={`w-full px-4 py-2 border rounded-md ${errors.paymentPhoto ? "border-red-400" : "border-gray-700"} bg-gray-100 text-gray-800 focus:border-violet-400 focus:outline-none`}
              />
              {errors.paymentPhoto && <span className="text-xs text-red-400">{errors.paymentPhoto}</span>}
              {paymentPhotoPreview && (
                <div className="mt-2">
                  <img src={paymentPhotoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                </div>
              )}
            </div>}


          </div>


          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Display Payment Details */}
            {paymentDetails && (
              <div className="mt-4 p-4 bg-gray-200 rounded-md text-center">
                <p className="text-sm text-gray-800">
                  <strong>Payment Information:</strong> {paymentDetails}
                </p>
              </div>
            )}
          </div>



          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" disabled={loading}
              className="w-full py-2 px-4 text-white bg-blue-600 rounded-md shadow-md focus:outline-none hover:bg-blue-500 disabled:opacity-50">
              {loading ? "Create Member..." : "Create Member"}
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Create_Member;