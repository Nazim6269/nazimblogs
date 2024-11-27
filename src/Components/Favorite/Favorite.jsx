import { useTheme } from "../../hooks/useTheme";

const Favorite = () => {
  const [theme] = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <ul className="space-y-5 my-5">
        <li>
          <h3
            className={`text-black font-medium hover:text-slate-300 transition-all cursor-pointer ${
              theme === "dark" ? "hover:text-slate-200" : ""
            }`}
          >
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p
            className={`text-slate-600 text-sm ${
              theme === "dark" ? "text-slate-400" : ""
            }`}
          >
            #tailwindcss, #server, #ubuntu
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Favorite;

