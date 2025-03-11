import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for date filtering
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blog");
        const data = await response.json();
        setBlogs(data);
        setLatestBlogs(data.slice(0, 3)); // Assuming the first 3 blogs are the latest
        setFilteredBlogs(data); // Set initial filtered blogs as all blogs
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle filtering based on date range
  const handleDateFilterChange = () => {
    const filtered = blogs.filter((blog) => {
      const blogDate = new Date(blog.createDate);

      const isAfterStartDate = startDate ? blogDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? blogDate <= new Date(endDate) : true;

      return isAfterStartDate && isBeforeEndDate;
    });

    setFilteredBlogs(filtered);
  };

  // Handle start and end date change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    handleDateFilterChange();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    handleDateFilterChange();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Date Filter Section */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="text-gray-700 text-xl font-medium mr-4">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="px-4 py-2 border bg-gray-200 rounded-lg shadow-sm w-full sm:w-auto"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="text-gray-700 text-xl font-medium mr-4">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              className="px-4 py-2 bg-gray-200 border rounded-lg shadow-sm w-full sm:w-auto"
            />
          </div>
        </div>

        {/* All Blogs Section */}
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 text-center my-5 ">All Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.split(",").map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={`${blog.createDate} ${blog.createTime}`}>
                      {blog.createDate}
                    </time>
                    <span>{blog.createTime}</span>
                  </div>
                  
                  {/* Button to link to individual blog */}
                  <div className="mt-4">
                    <Link 
                      to={`/blog/${blog._id}`}
                      className="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMain;
