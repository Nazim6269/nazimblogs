import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";
import SideBar from "../../Components/SideBar/SideBar";

const BlogCards = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

  // Total pages
  const totalPages = Math.ceil(data.length / postsPerPage);

  // Slice posts for current page
  const firstIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = data.slice(firstIndex, firstIndex + postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetching data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex  flex-col ">
      <div className="flex flex-col md:flex-row gap-5 m-5">
        {/* Blog Cards Section */}
        <div className="flex flex-col gap-4 flex-1">
          {currentPosts.map((item) => (
            <Link key={item.id} to={`/blog-details?id=${item.id}`}>
              <BlogCard data={item} />
            </Link>
          ))}
        </div>

        {/* Sidebar */}
        <SideBar />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogCards;
