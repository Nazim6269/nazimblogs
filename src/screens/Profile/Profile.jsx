import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogCards from "../BlogCards/BlogCards";

const Profile = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="relative">
        <p className="bg-gray-500 w-24 h-24 text-4xl rounded-full text-white font-bold flex justify-center items-center">
          N
        </p>
        <span className="bg-slate-600 w-7 h-7 rounded-full absolute bottom-0 right-0 flex justify-center items-center text-sm">
          <FontAwesomeIcon icon={faPen} className="text-white" />
        </span>
      </div>
      <div className="text-center my-6">
        <span className="text-white text-2xl font-bold">Nazim Uddin</span>
        <p className="text-white">nazimdev10022001@gmail.com</p>
      </div>
      <div className="relative">
        <p className="text-slate-500 text-center">
          This is Nazim, who wants to be a full stack engineer though its not
          easy at all.But he is always trying his best. Now he is learning Front
          end development through various resourches in online.Recently he is
          studying in University of Chittagong .
        </p>
        <span className="bg-slate-600 w-7 h-7 rounded-full absolute top-0 right-0 flex justify-center items-center text-sm">
          <FontAwesomeIcon icon={faPen} className="text-white" />
        </span>
      </div>

      <hr />
      <div className="flex flex-col gap-3 mt-7">
        <h2 className="text-white text-4xl font-semibold mb-5">Your blogs</h2>
        <BlogCards />
      </div>
    </div>
  );
};

export default Profile;
