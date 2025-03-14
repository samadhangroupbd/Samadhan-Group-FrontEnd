import React, { useContext } from "react";
import { AuthContext } from "../../../../Authentication/AuthProvider/AuthProvider";

const HomeBanner = () => {
  const { user } = useContext(AuthContext);

  // Button Component to DRY up code for the "Drop CV" button
  const Button = ({ href, bgColor, borderColor, text, iconColor, iconSize }) => (
    <a
      href={href}
      className={`relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 ${borderColor} ${bgColor} rounded-full hover:bg-green-800 hover:border-green-800 group transition-all ease-in-out duration-300`}
    >
      <span className="absolute left-0 block w-full h-0 transition-all bg-green-900 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
      <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg
          className={`w-${iconSize} h-${iconSize}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative">{text}</span>
    </a>
  );

  return (
    <div className="relative  h-screen overflow-hidden mt-20">
      {/* Video Background */}
      <video
        className="absolute top-0  left-0 w-full h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="./bannerVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay Section */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>

      {/* Content Section */}
      <div className="relative z-10 text-white flex flex-col justify-center items-center w-full h-full text-center px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8 lg:px-12 lg:py-10">
        {/* Title with Shadow */}
        {/* <h1 className="text-4xl sm:text-2xl md:text-4xl lg:text-6xl font-extrabold mb-6 text-shadow-xl">
          Welcome to <span className="text-blue-400">Samadhan Group</span>
        </h1> */}

        {/* Description with Text Shadow */}
        {/* <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-lg text-shadow-md">
          We are dedicated to bringing solutions, knowledge, and opportunities to the community. Let's work together for a better future.
        </p> */}

        {/* Button Section */}
        <div className="flex space-x-4 mt-8">
          {/* Conditionally render buttons based on user login status */}
          {!user ? (
            <>
              <a
                href="/registration"
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-blue-700 bg-blue-700 rounded-full hover:bg-blue-800 hover:border-blue-800 group transition-all ease-in-out duration-300"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-900 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Register</span>
              </a>

              {/* <a
                href="/registration"
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-blue-700 bg-blue-700 rounded-full hover:bg-blue-800 hover:border-blue-800 group transition-all ease-in-out duration-300"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-900 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Drop CV</span>
              </a> */}
            </>
          ) : (
            <>
              {/* Get Started Button if user is logged in */}
              {/* <Button
                href="/get-started"
                bgColor="bg-blue-700"
                borderColor="border-blue-700"
                text="Get Started"
                iconColor="blue"
                iconSize="5"
              /> */}

              {/* Drop CV Button if user is logged in */}
              <Button
                href="/drop-cv"
                bgColor="bg-green-700"
                borderColor="border-green-700"
                text="Drop CV"
                iconColor="green"
                iconSize="5"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
