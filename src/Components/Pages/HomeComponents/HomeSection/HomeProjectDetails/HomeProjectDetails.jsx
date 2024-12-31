import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate

const HomeProjectDetails = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate for the back button

  useEffect(() => {
    // Fetch the project data based on the dynamic id
    fetch("/projects.json")  // Replace this with the correct API endpoint or JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        return response.json();
      })
      .then((data) => {
        // Find the project by its id
        const projectData = data.find((p) => p._id === id);
        setProject(projectData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // Re-run effect when id changes

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}  // Go back to the previous page
          className="text-blue-600 mt-24 pb-5 hover:text-blue-800 mb-4"
        >
          &#8592; Back 
        </button>

        {/* Project Title */}
        <h2 className="text-3xl font-[ui-monospace] font-bold text-gray-800 mb-4 ">{project.title}</h2>

        {/* Project Image */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-screen object-cover mb-6" 
        />

        {/* Project Description */}
        <p className="text-lg text-gray-700 text-justify">{project.description}</p>

        {/* Project Date */}
        <p className="text-sm text-gray-500 mt-4">{`Date: ${project.date}`}</p>
      </div>
    </div>
  );
};

export default HomeProjectDetails;
