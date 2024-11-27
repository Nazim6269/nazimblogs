import Comments from "../../Components/Comments/Comments";
import User from "../../Components/User/User";

const SingleBlog = () => {
  return (
    <div>
      <div className="">
        <div className="flex flex-col justify-between items-start gap-5">
          <h1 className="text-4xl capitalize font-mono">
            Integer Maecenas Eget Viverra
          </h1>
          <div
            className={
              "flex flex-col justify-start gap-4 items-start sm:flex sm:flex-row sm:justify-center sm:items-center "
            }
          >
            <User /> <span>12.12.2032</span> <span>100 Likes</span>
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
              {" "}
              Today I was mob programming with Square{"'"}s Mobile & Performance
              Reliability team and we toyed with an interesting idea. Our
              codebase has classes that represent screens a user can navigate
              to. These classes are defined in modules, and these modules have
              an owner team defined. When navigating to a screen, we wanted to
              have the owner team information available, at runtime. We created
              a build tool that looks at about 1000 Screen classes, determines
              the owner team, and generates a class to do the lookup at runtime.
              The generated code looked like this: mapOf(vararg pairs: Pair) is
              a nice utility to create a map (more specifically, a
              LinkedHashMap) but using that syntax leads to the creation of a
              temporary vararg array of size 1000, as well as 1000 temporary
              Pair instances. Memory hoarding Let
              {"'"}s look at the retained size of the map we just created: ~30
              characters per class name * 2 bytes per character = 60 bytes per
              entry Each entry is stored as a LinkedHashMapEntry which adds 2
              references to HashMap.Node which itself holds 3 references and 1
              int. On a 64bit VM that{"'"}s 5 references * 8 bytes, plus 4 bytes
              for the int: 44 bytes per entry. So for the entries alone we{"'"}
              re at (60 + 44) * 1000 = 104 KB. The default load factor is 75%,
              which means the size of the array backing the hashmap must always
              be at least 25% greater than the number of entries. And the array
              size has to be a factor of 2. So, for 1000 entries, that{"'"}s an
              object array of size 2048: 2048 * 8 = 16,314 bytes. The total
              retained size of the map is ~120 KB. Can we do better? Could we
              make it... 0?
            </p>
          </div>
          <div>
            <h2 className="text-3xl mt-7 mb-3">100% code-based map</h2>
            <p className="tracking-normal left-7">
              What if we generate code that returns the right team for a given
              screen, instead of creating a map? Since we know the full list of
              screen classes, we can check ahead of time whether there{"'"}s any
              hashcode conflict, and if not, we can generate code that directly
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-7 mb-2">Comments {"(3)"}</h2>
      <Comments />
    </div>
  );
};

export default SingleBlog;
