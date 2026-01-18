import RelatedArticleCard from "./RelatedArticleCard";

const RelatedArticles = ({ currentId, isDark }) => {
    const relatedIds = [1, 2, 3].filter((id) => id !== parseInt(currentId));

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2
                className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"
                    }`}
            >
                Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedIds.map((id) => (
                    <RelatedArticleCard key={id} id={id} isDark={isDark} />
                ))}
            </div>
        </div>
    );
};

export default RelatedArticles
