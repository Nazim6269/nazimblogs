import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Comments from "../../Components/Comments/Comments";
import User from "../../Components/User/User";
import { useTheme } from "../../hooks/useTheme";
import NoData from "../../Components/NoData/NoData";
import BlogHeader from "./BlogHeader";
import BlogMeta from "./BlogMeta";
import BlogCoverImage from "./BlogCoverImage";
import BlogTags from "./BlogTags";
import BlogContent from "./BlogContent";
import RelatedArticles from "./RelatedArticles";
import CommentsSection from "./CommentsSection";
import BlogActionBar from "./BlogActionBar";
import LoadingSkeleton from "./LoadingSkeleton";
import { fetchBlogById } from "../../helper/blogApi";

const SingleBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError("No blog ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogById(id);

        // Format for display
        const formattedBlog = {
          ...data,
          author: typeof data.author === "object" ? data.author.name : data.author,
          date: new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };

        setBlog(formattedBlog);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton isDark={isDark} />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen py-10 sm:py-16 md:py-20 px-4">
        <NoData
          message="Article Not Found"
          subMessage="The article you are looking for might have been deleted or the link is incorrect."
        />
        <div className="mt-8 text-center">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold transition-all duration-300 transform hover:scale-105 ${isDark
              ? "bg-brand-primary text-white hover:bg-purple-700"
              : "bg-brand-primary text-white hover:bg-purple-700"
              }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  const tags = blog.tags || [];
  const likes = blog.likes || 0;
  const commentCount = Math.floor(Math.random() * 50) + 5;

  return (
    <div
      className={`min-h-screen transition-all duration-500 pb-20 ${isDark ? "text-gray-200" : "text-gray-900"
        }`}
    >
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:py-12">
        {/* Back Link */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-8 font-semibold transition-all duration-300 hover:gap-3 ${isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
            }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to feed
        </Link>

        {/* Blog Header */}
        <BlogHeader title={blog.title} isDark={isDark} />

        {/* Blog Meta */}
        <BlogMeta blog={blog} isDark={isDark} />

        {/* Cover Image */}
        <BlogCoverImage id={id} title={blog.title} isDark={isDark} imageUrl={blog.imageSrc} />

        {/* Tags */}
        <BlogTags tags={tags} isDark={isDark} />

        {/* Blog Content */}
        <BlogContent content={blog.body} isDark={isDark} />

        {/* Related Articles */}
        <RelatedArticles currentId={id} isDark={isDark} />

        {/* Comments Section */}
        <CommentsSection isDark={isDark} count={commentCount} />
      </div>

      {/* Sticky Action Bar */}
      <BlogActionBar isDark={isDark} likes={likes} comments={commentCount} />
    </div>
  );
};

export default SingleBlog;
