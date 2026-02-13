import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTag } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";
import { fetchBlogs } from "../../helper/blogApi";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";
import NoData from "../../Components/NoData/NoData";

const TagBlogsPage = () => {
  const { tag } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ tag, page, limit: 10 });
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs?${params}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [tag, page]);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <Helmet>
        <title>#{tag} | NazimBlogs</title>
      </Helmet>

      <Link
        to="/tags"
        className={`inline-flex items-center gap-1.5 mb-4 text-sm font-medium transition-colors ${
          isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        All Tags
      </Link>

      <h1 className={`text-xl font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
        <FontAwesomeIcon icon={faTag} className="mr-2 text-brand-primary" />
        Posts tagged <span className="text-brand-primary">#{tag}</span>
      </h1>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`h-32 rounded-lg animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <NoData message="No posts found" subMessage={`No published posts with tag #${tag}`} />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blog-details/${blog._id}`}>
                <BlogCard data={blog} />
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-5">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TagBlogsPage;
