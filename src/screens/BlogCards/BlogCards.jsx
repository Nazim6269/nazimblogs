import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import SideBar from "../../Components/SideBar/SideBar";
import Pagination from "../../Components/Pagination/Pagination";

const BlogCards = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data.length / 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // data fetching here
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
    <>
      <div className="flex flex-col md:flex md:flex-row gap-5 m-5">
        <div className="flex flex-col gap-2">
          <Link to={`/blog-details?id=${2}`}>
            {data?.map((item) => (
              <BlogCard key={item.id} data={item} />
            ))}
          </Link>
        </div>
        <SideBar />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default BlogCards;
