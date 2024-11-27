import BlogCard from "../../Components/BlogCard/BlogCard";
import SideBar from "../../Components/SideBar/SideBar";

const BlogCards = () => {
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row gap-5 m-5">
        <div className="flex flex-col gap-2">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default BlogCards;
