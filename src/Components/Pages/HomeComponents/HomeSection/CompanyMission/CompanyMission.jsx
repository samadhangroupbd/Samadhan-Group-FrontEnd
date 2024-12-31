import React from "react";
import { LuGoal } from "react-icons/lu";
import { MdAccountTree } from "react-icons/md";
import { TbEyeSearch } from "react-icons/tb";

const CompanyMission = () => {
  return (
    <div className="bg-gray-100  pb-10">
      {/* Title Section */}
      <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center pt-10">
      How We Think
      </h2>
        <p className="text-lg sm:text-lg text-gray-700 max-w-3xl mx-auto">
          Innovative, customer-focused, and committed to excellence. Your needs guide our solutions.
        </p>
      </div>

      {/* Mission, Vision, and How We Work Cards */}
      <div className="flex flex-wrap justify-center gap-12">

        {/* How We Work Card */}
        <div className="w-full sm:w-80 bg-white shadow-lg rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-blue-600 hover:text-white">
          <div className="flex justify-center items-center text-5xl text-green-600 mb-4 bg-blue-100 p-4 rounded-full">
            <MdAccountTree />
          </div>
          <h3 className="text-2xl font-semibold mb-2">How We Work</h3>
          <p>The simplicity of insurance, easy signup, quick claims, ongoing support.</p>
        </div>

        {/* Our Mission Card */}
        <div className="w-full sm:w-80 bg-white shadow-lg rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-blue-600 hover:text-white">
          <div className="flex justify-center items-center text-5xl text-green-600 mb-4 bg-green-200 p-4 rounded-full">
            <LuGoal />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p>The prosperity of the nation and the well-being of all humankind.</p>
        </div>

        {/* Our Vision Card */}
        <div className="w-full sm:w-80 bg-white shadow-lg rounded-xl p-8 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-blue-600 hover:text-white">
          <div className="flex justify-center items-center text-5xl text-green-600 mb-4 bg-yellow-200 p-4 rounded-full">
            <TbEyeSearch />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p>Helping people from all walks of life do something exceptional.</p>
        </div>

      </div>
    </div>
  );
};

export default CompanyMission;
