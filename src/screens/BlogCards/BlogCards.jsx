import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";
import SideBar from "../../Components/SideBar/SideBar";
import NoData from "../../Components/NoData/NoData";

const BlogCards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const postsPerPage = 10;

  // Filter logic
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / postsPerPage);

  // Slice posts for current page
  const currentPosts = useMemo(() => {
    const firstIndex = (currentPage - 1) * postsPerPage;
    return filteredData.slice(firstIndex, firstIndex + postsPerPage);
  }, [filteredData, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetching data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      {searchQuery && (
        <div className="mx-5 mt-5">
          <h2 className="text-xl font-semibold opacity-70">
            Showing results for: <span className="text-purple-500">"{searchQuery}"</span>
            <span className="ml-2 text-sm font-normal">({filteredData.length} articles found)</span>
          </h2>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 m-5">
        {/* Blog Cards Section */}
        <div className="flex flex-col gap-4 flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((item) => (
              <Link key={item.id} to={`/blog-details?id=${item.id}`}>
                <BlogCard data={item} />
              </Link>
            ))
          ) : (
            <NoData
              message={searchQuery ? "No results found" : "No Blogs Found"}
              subMessage={searchQuery
                ? "We couldn't find any articles matching your search. Try different keywords!"
                : "We couldn't find any articles at the moment. Please check back later!"
              }
            />
          )}
        </div>

        {/* Sidebar */}
        <SideBar />
      </div>

      {/* Pagination */}
      {currentPosts.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BlogCards;
