import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-6">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${currentPage === 1
            ? "opacity-40 cursor-not-allowed bg-gray-400 text-white"
            : isDark
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }
        `}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300
      ${currentPage === num
              ? "bg-purple-600 text-white border-0 shadow-lg shadow-purple-500/40"
              : isDark
                ? "bg-gray-900 border-gray-700 text-gray-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500/20"
                : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:shadow-sm hover:shadow-blue-500/20"
            }
    `}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${currentPage === totalPages
            ? "opacity-40 cursor-not-allowed bg-gray-400 text-white"
            : isDark
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};
