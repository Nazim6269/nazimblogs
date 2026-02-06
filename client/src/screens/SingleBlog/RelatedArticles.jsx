import { useEffect, useState } from "react";
import RelatedArticleCard from "./RelatedArticleCard";
import { fetchBlogs } from "../../helper/blogApi";

const RelatedArticles = ({ currentId, isDark }) => {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const loadRelated = async () => {
            try {
                const blogs = await fetchBlogs({ limit: 4 });
                setRelated(blogs.filter(b => (b._id || b.id) !== currentId).slice(0, 3));
            } catch {
                setRelated([]);
            }
        };
        loadRelated();
    }, [currentId]);

    if (related.length === 0) return null;

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2
                className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"
                    }`}
            >
                Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((blog) => (
                    <RelatedArticleCard key={blog._id || blog.id} blog={blog} isDark={isDark} />
                ))}
            </div>
        </div>
    );
};

export default RelatedArticles
