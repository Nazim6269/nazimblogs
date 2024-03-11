import BlogCards from "../BlogCards/BlogCards";

const Profile = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="relative">
        <p className="bg-orange-500 w-24 h-24 text-4xl rounded-full text-white font-bold flex justify-center items-center">
          S
        </p>
        <span className="bg-slate-600 w-7 h-7 rounded-full absolute bottom-0 right-0"></span>
      </div>
      <div className="text-center my-6">
        <span className="text-white text-2xl font-bold">Saad Hassan</span>
        <p className="text-white">saad@gmail.com</p>
      </div>
      <div className="relative">
        <p className="text-slate-500 text-center">
          Sumit is an entrepreneurial visionary known for his exceptional
          performance and passion for technology and business. He established
          Analyzen in 2008 while he was a student at Bangladesh University of
          Engineering & Technology (BUET). Analyzen has since become a top-tier
          Web and Mobile Application Development firm and the first Digital and
          Social Media Marketing Agency in Bangladesh.
        </p>
        <span className="bg-slate-600 w-7 h-7 rounded-full absolute  top-0 right-0"></span>
      </div>

      <hr />
      <div className="flex flex-col gap-3 mt-7">
        <h2 className="text-white text-4xl font-semibold mb-5">Your blogs</h2>
        <BlogCards />
        <BlogCards />
        <BlogCards />
      </div>
    </div>
  );
};

export default Profile;
