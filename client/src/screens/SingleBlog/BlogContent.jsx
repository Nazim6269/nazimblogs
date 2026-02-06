import DOMPurify from "dompurify";

const BlogContent = ({ content, isDark }) => {
  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <article
      className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""}`}
    >
      <div
        className={`leading-relaxed text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </article>
  );
};

export default BlogContent;
