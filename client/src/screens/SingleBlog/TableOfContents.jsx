import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TableOfContents = ({ content, isDark }) => {
  const [isOpen, setIsOpen] = useState(true);

  const headings = useMemo(() => {
    if (!content) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const elements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    return Array.from(elements).map((el, i) => ({
      id: `heading-${i}`,
      text: el.textContent,
      level: parseInt(el.tagName[1]),
    }));
  }, [content]);

  if (headings.length < 2) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`my-6 rounded-lg border ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
          isDark
            ? "text-gray-300 hover:text-white"
            : "text-gray-700 hover:text-gray-900"
        }`}
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faListUl} className="text-xs text-brand-primary" />
          Table of Contents
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="px-4 pb-3 space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - minLevel) * 16}px` }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={`text-left text-sm py-1 transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-brand-primary"
                    : "text-gray-500 hover:text-brand-primary"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default TableOfContents;
