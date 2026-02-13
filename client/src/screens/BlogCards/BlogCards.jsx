import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";
import SideBar from "../../Components/SideBar/SideBar";
import NoData from "../../Components/NoData/NoData";
import { fetchBlogs } from "../../helper/blogApi";
import { stripHTML } from "../../utils/stripHTML";

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
      stripHTML(post.body).toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Header */}
      <div className="px-4 sm:px-5 mt-4 sm:mt-6 mb-1">
        {searchQuery ? (
          <div>
            <h2 className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Search Results
            </h2>
            <p className={`text-xs opacity-60 mt-0.5`}>
              {filteredData.length} articles for "{searchQuery}"
              {currentCategory !== "Explore" && ` in ${currentCategory}`}
            </p>
          </div>
        ) : (
          <div>
            <h2 className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {currentCategory === "Explore" ? "Latest" : currentCategory}
            </h2>
            <p className={`text-xs opacity-60 mt-0.5`}>
              {currentCategory === "Explore"
                ? "Discover insights, stories, and expertise."
                : `Latest articles in ${currentCategory}.`
              }
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-4 sm:p-5">
        {/* Blog Cards Section */}
        <div className="flex flex-col gap-3 lg:col-span-8 order-1">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => {
                const bg = isDark ? "bg-gray-700" : "bg-gray-200";
                return (
                  <div key={i} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
                    <div className={`w-full sm:w-44 md:w-52 h-36 sm:h-32 rounded-md shrink-0 ${bg}`} />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full ${bg}`} />
                          <div className={`h-3 w-20 rounded ${bg}`} />
                          <div className={`h-3 w-14 rounded ${bg}`} />
                        </div>
                        <div className={`h-5 w-3/4 rounded ${bg}`} />
                        <div className="space-y-1.5">
                          <div className={`h-3 w-full rounded ${bg}`} />
                          <div className={`h-3 w-4/5 rounded ${bg}`} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className={`h-3 w-10 rounded ${bg}`} />
                        <div className={`h-3 w-10 rounded ${bg}`} />
                        <div className={`h-3 w-10 rounded ${bg}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {currentPosts.map((item) => (
                <Link key={item._id} to={`/blog-details/${item._id}`} className="block">
                  <BlogCard data={item} />
                </Link>
              ))}
            </div>
          ) : (
            <NoData
              message={searchQuery ? "No results found" : "No articles yet"}
              subMessage={searchQuery
                ? `No articles matching "${searchQuery}". Try a different search.`
                : `No articles in ${currentCategory} yet.`
              }
            />
          )}

          {currentPosts.length > 0 && totalPages > 1 && (
            <div className="py-6 border-t border-gray-500/10 mt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 order-2">
          <SideBar blogs={data} />
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
