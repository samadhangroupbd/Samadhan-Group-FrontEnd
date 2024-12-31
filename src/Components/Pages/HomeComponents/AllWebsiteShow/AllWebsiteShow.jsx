import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

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

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const AllWebsiteShow = () => {
  const [websites, setWebsites] = useState([]);

  // Fetch the website data from the JSON file
  useEffect(() => {
    fetch("/website.json")  // Make sure the JSON file is placed in the public directory
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the data before setting the state
        setWebsites(shuffleArray(data));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto text-center pb-8 pt-14">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Explore Popular Websites</h2>
      </div>
      <div className="max-w-screen-2xl p-5 mx-auto bg-gray-100 text-gray-800">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {/* Map over the shuffled websites data and dynamically render cards */}
          {websites.slice(0, 6).map((website) => (
            <a href={website.website_link} target="_blank" rel="noopener noreferrer" key={website.id} className="block">
              <Card className="max-w-[24rem] overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg border border-gray-200">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={website.website_image}
                    alt={website.website_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="h5" color="blue-gray" className="font-semibold text-lg">
                    {website.website_name}
                  </Typography>
                </CardBody>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllWebsiteShow;
