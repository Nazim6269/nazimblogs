import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
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

  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div className="max-w-7xl mx-auto w-full flex flex-col min-h-screen">
      {searchQuery && (
        <div className="px-5 mt-10 mb-2">
          <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            Search Results
          </h2>
          <p className={`text-sm font-semibold opacity-60 flex items-center gap-2 mt-1`}>
            Found {filteredData.length} articles for <span className="text-purple-500 underline decoration-purple-500/30 underline-offset-4">"{searchQuery}"</span>
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 p-5 lg:p-8">
        {/* Blog Cards Section */}
        <div className="flex flex-col gap-6 flex-1 order-2 lg:order-1">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid gap-6">
              {currentPosts.map((item) => (
                <Link key={item.id} to={`/blog-details?id=${item.id}`} className="block">
                  <BlogCard data={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20">
              <NoData
                message={searchQuery ? "No results found" : "No Blogs Found"}
                subMessage={searchQuery
                  ? "We couldn't find any articles matching your search. Try different keywords!"
                  : "We couldn't find any articles at the moment. Please check back later!"
                }
              />
            </div>
          )}

          {/* Pagination */}
          {currentPosts.length > 0 && totalPages > 1 && (
            <div className="py-10 border-t border-gray-500/10 mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="order-1 lg:order-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
