import { useTheme } from "../../hooks/useTheme"; 

const PopularBlog = () => {
  const [theme] = useTheme(); 

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="md:col-span-2 h-full w-full space-y-5">
        <div>
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
                by
                <a
                  href="./profile.html"
                  className="text-indigo-500 hover:underline"
                >
                  Saad Hasan
                </a>
                <span>·</span> 100 Likes
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopularBlog;
