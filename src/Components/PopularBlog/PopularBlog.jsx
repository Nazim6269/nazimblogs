const PopularBlog = () => {
  return (
    <div>
      <div className="md:col-span-2 h-full w-full space-y-5">
        <div className="">
          <ul className="space-y-5 my-5">
            <li>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">Saad Hasan</a>
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
