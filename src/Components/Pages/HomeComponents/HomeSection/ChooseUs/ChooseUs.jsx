import React from "react";
import { Carousel } from "@material-tailwind/react"; // Import the carousel

// Gallery With Carousel Component
export function GalleryWithCarousel() {
  return (
    <Carousel loop={true} autoplay={true} className="rounded-xl">
      <img
        src="./HomePageBanner.jpg"
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />
      <img
        src="./HomePageBanner.jpg"
        alt="image 2"
        className="h-full w-full object-cover object-center"
      />
      <img
        src="./HomePageBanner.jpg"
        alt="image 3"
        className="h-full w-full object-cover object-center"
      />
    </Carousel>
  );
}

// Main ChooseUs Component
const ChooseUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Heading moved to the very top */}
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
      </div>

      {/* Flex container with the gallery and the reasons */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Left side: Why Choose Us section */}
        <div className="w-full md:w-1/2 space-y-6 px-6 md:px-12 order-2 md:order-1">
          <p className="text-lg text-gray-700">
            At <span className="text-blue-500 font-bold">Samadhan Group</span>, we are committed to providing accessible and high-quality healthcare. Here's why you should trust us with your health.
          </p>

          {/* List of reasons */}
          <section className="space-y-8">
            <div className="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-blue-500">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Experienced Employees </h3>
                <p className="text-gray-600">Our team consists of highly qualified employees with years of experience in their respective fields.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-green-500">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">24/7 Availability</h3>
                <p className="text-gray-600">Our platform is available at any time of the day, so you can connect with a doctor whenever you need assistance.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-blue-500">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Affordable Pricing</h3>
                <p className="text-gray-600">Our consultations are affordable, with transparent pricing and no hidden fees. Quality healthcare without the hassle.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-green-500">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Comprehensive Care</h3>
                <p className="text-gray-600">From diagnosis to treatment, we provide a comprehensive care plan for every patient.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right side: Gallery with Carousel */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <GalleryWithCarousel />
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;

