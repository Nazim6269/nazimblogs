import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";
import { fetchSeriesById } from "../../helper/seriesApi";
import BlogCard from "../../Components/BlogCard/BlogCard";
import NoData from "../../Components/NoData/NoData";

const SeriesPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeriesById(id)
      .then(setSeries)
      .catch(() => setSeries(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-6 px-4 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={`h-32 rounded-lg animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />
        ))}
      </div>
    );
  }

  if (!series) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <NoData message="Series not found" subMessage="This series may have been deleted." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <Helmet>
        <title>{series.title} | NazimBlogs</title>
      </Helmet>

      <Link
        to="/"
        className={`inline-flex items-center gap-1.5 mb-4 text-sm font-medium transition-colors ${
          isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back
      </Link>

      <div className={`p-4 rounded-lg border mb-5 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-center gap-2 mb-2">
          <FontAwesomeIcon icon={faLayerGroup} className="text-brand-primary" />
          <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{series.title}</h1>
        </div>
        {series.description && (
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{series.description}</p>
        )}
        <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {series.blogs?.length || 0} posts in this series · by {series.author?.name}
        </p>
      </div>

      {series.blogs?.length === 0 ? (
        <NoData message="No posts yet" subMessage="This series has no blog posts." />
      ) : (
        <div className="flex flex-col gap-3">
          {series.blogs?.map((blog, index) => (
            <div key={blog._id} className="flex gap-3 items-start">
              <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                isDark ? "bg-brand-primary/20 text-brand-primary" : "bg-purple-100 text-brand-primary"
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/blog-details/${blog._id}`}>
                  <BlogCard data={blog} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeriesPage;
