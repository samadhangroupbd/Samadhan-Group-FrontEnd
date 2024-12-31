import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProjectCard = ({ project }) => {
  const maxDescriptionLength = 100;
  const truncatedDescription =
    project.description.length > maxDescriptionLength
      ? project.description.slice(0, maxDescriptionLength) + "..."
      : project.description;

  const navigate = useNavigate(); // Initialize navigate

  const handleReadMore = () => {
    // Navigate to the details page of the project
    navigate(`/project/${project._id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-80 mb-6 transform transition-all hover:scale-105 hover:shadow-xl hover:translate-y-2">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transform transition-all hover:opacity-90"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{truncatedDescription}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">{`${project.date}`}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={handleReadMore} // Add onClick to trigger navigation
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};


// HomeProjects component to fetch and display all project cards
const HomeProjects = () => {
  // State to store fetched project data
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from JSON or API
  useEffect(() => {
    fetch("./projects.json")  // Change this to your actual JSON file or API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects data");
        }
        return response.json();
      })
      .then((data) => {
        setProjectsData(data);  // Set the fetched data to the state
        setLoading(false);       // Set loading to false
      })
      .catch((error) => {
        setError(error.message);  // Handle errors
        setLoading(false);
      });
  }, []); // Empty dependency array to run this effect once after initial render

  // Loading state
  if (loading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center text-xl text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <h2 className="text-3xl py-10 sm:text-4xl font-bold mb-8 text-gray-800 text-center">
        Our Projects
      </h2>

      {/* Project cards */}
      <div className="flex flex-wrap justify-center gap-6 px-6 pb-10">
        {projectsData.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default HomeProjects;
