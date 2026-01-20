import React from 'react'

const BlogContent = ({ content, isDark }) => {
    // Split content into paragraphs
    const paragraphs = content.split("\n").filter((p) => p.trim());

    return (
        <article
            className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""
                }`}
        >
            <div className="space-y-6 leading-relaxed text-lg">
                {paragraphs.map((paragraph, index) => (
                    <p
                        key={index}
                        className={`${index === 0
                            ? "first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-purple-500"
                            : ""
                            } ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                        {paragraph}
                    </p>
                ))}

                {/* Additional dynamic content */}
                <div className="my-12">
                    <h2
                        className={`text-3xl font-bold mb-6 pb-4 border-l-4 pl-6 ${isDark
                            ? "border-purple-500 text-white"
                            : "border-purple-600 text-gray-900"
                            }`}
                    >
                        Key Takeaways
                    </h2>
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                        This article explores important concepts and provides valuable insights
                        that can help you understand the topic better. The discussion covers
                        various perspectives and practical applications.
                    </p>
                </div>

                <blockquote
                    className={`border-l-4 pl-6 py-4 my-8 italic ${isDark
                        ? "border-purple-500 bg-purple-900/10 text-gray-300"
                        : "border-purple-600 bg-purple-50 text-gray-700"
                        }`}
                >
                    "Understanding the fundamentals is key to mastering any subject. Take time
                    to reflect on the concepts and apply them in real-world scenarios."
                </blockquote>

                <div className="my-12">
                    <h2
                        className={`text-3xl font-bold mb-6 pb-4 border-l-4 pl-6 ${isDark
                            ? "border-purple-500 text-white"
                            : "border-purple-600 text-gray-900"
                            }`}
                    >
                        Conclusion
                    </h2>
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                        In summary, this topic requires careful consideration and continuous
                        learning. By staying informed and applying best practices, you can
                        achieve better results and deepen your understanding.
                    </p>
                </div>
            </div>
        </article>
    );
}

export default BlogContent