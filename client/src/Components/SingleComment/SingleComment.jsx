import { useTheme } from "../../hooks/useTheme";
import User from "../User/User";

const SingleComment = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        group flex flex-col lg:flex-row gap-5 p-6 rounded-2xl border
        ${isDark
          ? "bg-slate-800 border-gray-700 text-gray-200 hover:shadow-purple-500/20"
          : "bg-slate-100 border-gray-300 text-gray-900 hover:shadow-purple-300/30"
        }
      `}
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
