import SideBar from "../../Components/shared/SideBar/SideBar";
import BlogCards from "../BlogCards/BlogCards";

const Home = () => {
  return (
    <div>
      {/* <Login /> */}

      {/* <Register /> */}

      {/* {<SingleBlog />} */}

      <div className="flex gap-5 m-5">
        <div className="flex flex-col gap-2">
          <BlogCards />
          <BlogCards />
          <BlogCards />
          <BlogCards />
          <BlogCards />
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
