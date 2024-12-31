import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Use Link for back navigation

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams(); // Get the blog id from the URL

  // Fetch the blog data when the component mounts
  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the blog that matches the id
        const foundBlog = data.find((blog) => blog.id === parseInt(id));
        setBlog(foundBlog);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, [id]); // Re-fetch data when the id changes

  // Display a loading message or blog details
  if (!blog) {
    return (
      <div className="max-w-screen-xl p-5 mx-auto text-center text-gray-800">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl h-auto mt-20 p-5 mx-auto bg-gray-50 text-gray-800">
      {/* Back Button */}
      <div className="mb-5 mt-5">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back
        </Link>
      </div>

      {/* Blog Detail Section */}
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full lg:w-2/3 mt-5">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover transition-all duration-500 transform hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/3 p-5 lg:p-8 flex flex-col justify-between">
          <h1 className="text-3xl sm:text-3xl font-semibold text-blue-900">{blog.title}</h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-3">{blog.description}</p>

          {/* Author and Date */}
          <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-500 flex space-x-5">
            <span>By {blog.author}</span>
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>

          {/* Tags */}
          <div className="mt-4 sm:mt-5">
            <h3 className="text-xl font-semibold text-gray-800">Tags:</h3>
            <ul className="list-disc pl-6 mt-2">
              {blog.tags.map((tag, index) => (
                <li key={index} className="text-gray-500">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
