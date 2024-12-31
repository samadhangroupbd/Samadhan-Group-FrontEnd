import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // To enable navigation

// Helper function to format the date in "24 Jun 2024" format
const formatDate = (dateString) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blog data from the JSON file
  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data); // Set the blog data
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto text-center pb-8 pt-14">
        <h2 className="text-4xl font-bold text-gray-800">Blog & News</h2>
      </div>
      <div className="max-w-screen-2xl p-5 mx-auto bg-gray-100 text-gray-800">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {/* Map over the blogs data and display each one */}
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 rounded-2xl shadow-lg"
              style={{ backgroundImage: `url(${blog.image})` }} // Dynamic image from JSON
            >
              {/* Darken the entire background using a more intense gradient */}
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black to-black opacity-70 rounded-2xl"></div>
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-violet-600 rounded-full"
                >
                  {blog.category} {/* Dynamic category */}
                </a>
                <div className="flex flex-col justify-start text-center text-white">
                  <span className="text-3xl font-semibold leading-none tracking-wide">
                    {formatDate(blog.date).split(" ")[0]} {/* Day */}
                  </span>
                  <span className="leading-none uppercase">
                    {formatDate(blog.date).split(" ")[1]} {/* Month */}
                  </span>
                  <span className="leading-none uppercase">
                    {formatDate(blog.date).split(" ")[2]} {/* Year */}
                  </span>
                </div>
              </div>
              <h2 className="z-10 p-5 text-white">
                <Link
                  to={`/blog/${blog.id}`}  // Link to the details page
                  className="font-semibold text-xl hover:underline"
                >
                  {blog.title}
                </Link>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBlog;