import React from "react";
import { FaHandshake, FaUsers, FaCogs, FaHeart, FaShieldAlt, FaRecycle } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ServiceOffers = () => {
    const servicesData = [
        {
            title: 'Community Support',
            description: 'Providing a network of support for individuals and families in need of resources, education, and care.',
            icon: <FaHandshake className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Empowerment Programs',
            description: 'Offering programs designed to empower communities with knowledge, skills, and opportunities for a brighter future.',
            icon: <FaUsers className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Sustainable Development',
            description: 'Promoting sustainable initiatives that drive community growth, economic stability, and environmental preservation.',
            icon: <FaCogs className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Health & Wellness',
            description: 'Improving the well-being of the community through access to healthcare services, mental health support, and wellness programs.',
            icon: <FaHeart className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Safety & Security',
            description: 'Ensuring the safety and protection of individuals and communities through advocacy, emergency preparedness, and resource access.',
            icon: <FaShieldAlt className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Environmental Initiatives',
            description: 'Promoting sustainable living through environmental programs, recycling initiatives, and green community practices.',
            icon: <FaRecycle className="text-4xl mb-4 text-indigo-600" />,
        },
    ];

    return (
        <div className="py-20 px-4 bg-gray-100 flex flex-col md:flex-row">
            {/* Left Section: Header and Lottie Animation */}
            <div className="w-full md:w-1/3 text-center md:text-left mb-12 md:mb-0 p-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-8">
                    At Samadhan Group, we are committed to driving positive change in the communities we serve. Our services aim to support, empower, and create sustainable growth for a better future.
                </p>
                {/* Lottie Animation */}
                <div className=" max-w-xs sm:max-w-md mx-auto ">
                    <DotLottieReact
                        src="https://lottie.host/aadef17b-abc5-40c7-86c3-e7541f81773f/mchSV4DkYl.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>

            {/* Right Section: Services Offered */}
            <div className="w-full md:w-2/3 container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-50 p-3 rounded-full shadow">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-blue-600">{service.title}</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 ">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceOffers;
