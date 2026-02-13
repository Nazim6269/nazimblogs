import { useMemo, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("typescript", typescript);

const BlogContent = ({ content, isDark }) => {
  const contentRef = useRef(null);

  const processedHTML = useMemo(() => {
    if (!content) return "";
    const sanitized = DOMPurify.sanitize(content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitized, "text/html");
    let headingIndex = 0;
    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
      el.id = `heading-${headingIndex++}`;
    });
    return doc.body.innerHTML;
  }, [content]);

  useEffect(() => {
    if (!contentRef.current) return;

    contentRef.current
      .querySelectorAll("pre code, pre.ql-syntax")
      .forEach((block) => {
        if (block.dataset.highlighted) return;
        hljs.highlightElement(block);
      });

    contentRef.current.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      pre.style.position = "relative";
      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer";
      btn.textContent = "Copy";
      btn.onclick = () => {
        const code = pre.querySelector("code") || pre;
        navigator.clipboard.writeText(code.textContent);
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 2000);
      };
      pre.appendChild(btn);
    });
  }, [processedHTML]);

  return (
    <article
      className={`prose prose-base max-w-none ${isDark ? "prose-invert" : ""}`}
    >
      <div
        ref={contentRef}
        className={`leading-relaxed text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
        dangerouslySetInnerHTML={{ __html: processedHTML }}
      />
    </article>
  );
};

export default BlogContent;
