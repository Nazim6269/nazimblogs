import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-1.5 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors
          ${currentPage === 1
            ? "opacity-30 cursor-not-allowed"
            : isDark
              ? "text-gray-400 hover:text-white hover:bg-white/5"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        Prev
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`w-8 h-8 rounded text-xs font-medium transition-colors
            ${currentPage === num
              ? "bg-brand-primary text-white"
              : isDark
                ? "text-gray-400 hover:bg-white/5"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors
          ${currentPage === totalPages
            ? "opacity-30 cursor-not-allowed"
            : isDark
              ? "text-gray-400 hover:text-white hover:bg-white/5"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
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
