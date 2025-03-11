import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const View_Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`http://localhost:5000/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-1/4 mx-auto h-full object-cover object-center"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-500">
                <time dateTime={`${blog.createDate} ${blog.createTime}`}>
                  {blog.createDate} • {blog.createTime}
                </time>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(blog.tags?.split(',') || []).map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
            {blog.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default View_Blog;