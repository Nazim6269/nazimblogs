import { useTheme } from "../../hooks/useTheme";
import User from "../User/User";

const SingleComment = () => {
  const [theme] = useTheme();
  return (
    <div
      className={`bg-gray-100 p-4 rounded-lg mb-2 shadow-sm ${
        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <User
        comment={
          "Today I was mob programming with Square's Mobile & Performance Reliability team and we toyed with an interesting idea. Our codebase has classes that represent screens a user can navigate to. These classes are defined in modules, and these modules have an owner team defined. When navigating to a screen, we wanted to have the owner team information available, at runtime. We created a build tool that looks at about 1000 Screen classes, determines the owner team, and generates a class to do the lookup at runtime. The generated code looked like this:"
        }
      />
    </div>
  );
};

export default SingleComment;
