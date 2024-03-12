const BlogCards = () => {
  return (
    <div className="flex justify-center items-center gap-3 text-white  px-3 py-7 border rounded border-gray-600 transition duration-300 hover:ease-in hover:border-blue-400">
      <img className="w-96 " src="/React-Roadmap.jpg" alt="" />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl">React Fetch API</h3>
        <p className="mb-6 text-base text-gray-500 mt-1 ">
          Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor
          pretium donec dictum. Vici consequat justo enim. Venenatis eget
          adipiscing luctus lorem.
        </p>

        {/* <!-- Meta Informations --> */}
        <div className=" flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white px-4 py-2 rounded-full">
              <span className="">S</span>
            </div>

            <div>
              <h5 className="text-gray-500 text-sm">
                <a href="./profile.html">Saad Hasan</a>
              </h5>
              <div className="flex items-center text-xs text-gray-500">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-gray-500">
            <span>100 Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
