import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";

const Manage_Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query for title and tags
  const [startDate, setStartDate] = useState("");  // Start date for filtering
  const [endDate, setEndDate] = useState("");  // End date for filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blog");
        const data = await response.json();
        setBlogs(data); // Set the fetched blogs to state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search query (search by title or tags)
  const filteredBlogs = blogs
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => {
      if (startDate && new Date(blog.createDate) < new Date(startDate)) {
        return false;  // If blog's create date is earlier than start date, exclude it
      }
      if (endDate && new Date(blog.createDate) > new Date(endDate)) {
        return false;  // If blog's create date is later than end date, exclude it
      }
      return true;
    });

  // Pagination: Get current page blogs
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total pages calculation
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Handle Edit, Update, Delete buttons
  const handleEdit = (id) => {
    console.log("Edit blog with ID:", id);
    // Implement your edit functionality here
  };

  const handleDelete = (id) => {
    console.log("Delete blog with ID:", id);
    // Implement your delete functionality here
  };

  const handleView = (id) => {
    console.log("View blog with ID:", id);
    // Implement your view functionality here
  };

  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8 flex-wrap">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <Typography variant="h5" color="blue-gray">
                Blog List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See all blogs here
              </Typography>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link to={'/dashboard/create-blog'}>
                <Button className="flex items-center gap-3" size="sm">
                  Add Blog
                </Button>
              </Link>
            </div>
          </div>

          {/* Search input */}
          <div className="w-full sm:w-80 md:w-96 lg:w-1/2 xl:w-1/3">
            <Input
              label="Search by Title or Tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              labelProps={{ className: "text-sm" }}
            />
          </div>

          {/* Date filter inputs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex flex-col w-full sm:w-48">
              <Input
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-full sm:w-48">
              <Input
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Title
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Tags
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Created On
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map(({ _id, title, tags, createDate }, index) => {
                const isLast = index === currentBlogs.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {tags}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray">
                        {createDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Tooltip content="Edit">
                          <IconButton variant="text" onClick={() => handleEdit(_id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="View">
                          <IconButton variant="text" onClick={() => handleView(_id)}>
                            <FaEye className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <IconButton variant="text" onClick={() => handleDelete(_id)}>
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>

        {/* Pagination */}
        <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Manage_Blog;
