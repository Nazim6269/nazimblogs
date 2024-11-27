import { Link } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import SideBar from "../../Components/SideBar/SideBar";

const BlogCards = () => {
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row gap-5 m-5">
        <div className="flex flex-col gap-2">
          <Link to={`/blog-details?id=${2}`}>
            {Array.from({ length: 4 }, (_, index) => {
              return <BlogCard key={index} />;
            })}
          </Link>
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default BlogCards;
