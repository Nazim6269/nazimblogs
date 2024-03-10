import Favorite from "../../Favorite/Favorite";
import PopularBlog from "../../PopularBlog/PopularBlog";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-gray-500 hover:border-gray-600 rounded px-3 py-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Most Popular 👍️
        </h3>
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
      </div>
      <div className="border border-gray-500 hover:border-gray-600 rounded px-3 py-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Your Favourites ❤️
        </h3>
        <Favorite />
        <Favorite />
        <Favorite />
      </div>
    </div>
  );
};

export default SideBar;
