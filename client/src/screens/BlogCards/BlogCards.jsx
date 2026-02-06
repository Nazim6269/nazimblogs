import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";
import SideBar from "../../Components/SideBar/SideBar";
import NoData from "../../Components/NoData/NoData";
import { fetchBlogs } from "../../helper/blogApi";

const BlogCards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchQuery = searchParams.get("search") || "";

  // Determine current category from pathname
  const currentCategory = useMemo(() => {
    const path = location.pathname.split("/")[1];
    if (!path) return "Explore";
    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [location.pathname]);

  const postsPerPage = 10;

  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Filter by search on client side (data already filtered by category from API)
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

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, currentCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Fetching data from real backend
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchBlogs({
          category: currentCategory !== "Explore" ? currentCategory : undefined,
        });
        setData(result.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentCategory]);

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col min-h-screen">
      {/* Search and Category Header */}
      <div className="px-4 sm:px-5 mt-6 sm:mt-10 mb-2">
        {searchQuery ? (
          <div>
            <h2 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Search Results
            </h2>
            <p className={`text-sm font-semibold opacity-60 flex items-center gap-2 mt-1`}>
              Found {filteredData.length} articles for <span className="text-brand-secondary underline decoration-purple-500/30 underline-offset-4">&quot;{searchQuery}&quot;</span>
              {currentCategory !== "Explore" && <span> in <span className="text-brand-secondary font-bold">{currentCategory}</span></span>}
            </p>
          </div>
        ) : (
          <div>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {currentCategory === "Explore" ? "Featured Stories" : currentCategory}
            </h2>
            <p className={`text-sm font-semibold opacity-60 mt-1`}>
              {currentCategory === "Explore"
                ? "Discover the latest insights, stories, and expertise from writers in any field."
                : `Exploring the latest trends and articles in ${currentCategory}.`
              }
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-8">
        {/* Blog Cards Section - 8 columns */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-8 order-2 lg:order-1">
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
            <div className="grid gap-4 sm:gap-6 lg:gap-8">
              {currentPosts.map((item) => (
                <Link key={item._id} to={`/blog-details/${item._id}`} className="block">
                  <BlogCard data={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20">
              <NoData
                message={searchQuery ? "No results found" : "No Articles Available"}
                subMessage={searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}" in ${currentCategory}. Try broadening your search!`
                  : `Currently there are no articles in the ${currentCategory} category. Stay tuned for updates!`
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

        {/* Sidebar - 4 columns */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <SideBar blogs={data} />
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
