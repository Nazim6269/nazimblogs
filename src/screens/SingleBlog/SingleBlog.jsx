import { useTheme } from "../../hooks/useTheme"; 
import Comments from "../../Components/Comments/Comments";
import User from "../../Components/User/User";

const SingleBlog = () => {
  const [theme] = useTheme(); // Get current theme (dark or light)

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } p-5`}
    >
      <div className="flex flex-col justify-between items-start gap-5">
        <h1
          className={`text-4xl capitalize font-mono ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Integer Maecenas Eget Viverra
        </h1>
        <div
          className={
            "flex flex-col justify-start gap-4 items-start sm:flex sm:flex-row sm:justify-center sm:items-center "
          }
        >
          <User />
          <span>12.12.2032</span>
          <span>100 Likes</span>
        </div>
      </div>

      <div className="mt-2">
        <img
          src="/roadmap.webp"
          alt=""
          style={{ height: "50%", width: "59%" }}
        />
      </div>

      <div className="font-bold flex justify-start items-center gap-2 my-3 font-mono">
        <button>Javascript</button>
        <button>Node</button>
        <button>React</button>
        <button>Next</button>
      </div>

      <div>
        <div>
          <p className="tracking-normal leading-7">
            Today I was mob programming with Square{"'"}s Mobile & Performance
            Reliability team and we toyed with an interesting idea...
          </p>
        </div>

        <div>
          <h2
            className={`text-3xl mt-7 mb-3 ${theme === "dark" ? "text-white" : ""}`}
          >
            100% code-based map
          </h2>
          <p className="tracking-normal left-7">
            What if we generate code that returns the right team for a given
            screen...
          </p>
        </div>
      </div>

      <h2 className="text-2xl mt-7 mb-2">
        Comments {"(3)"}
      </h2>
      <Comments />
    </div>
  );
};

export default SingleBlog;
