import { Link } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { useTheme } from "../../hooks/useTheme";

const Login = () => {
  const { theme } = useTheme();
  console.log(theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen w-full items-start justify-center transition-colors duration-500 `}
    >
      <div
        className={`w-full max-w-lg px-10 py-12 rounded-3xl shadow-2xl space-y-8 transition-all duration-500
        ${
          isDark
            ? "bg-gray-900/90 border border-gray-700 text-gray-200"
            : "bg-white border border-gray-200 text-gray-900"
        }`}
      >
        {/* Title + Subtitle */}
        <div className="text-center space-y-2">
          <h2
            className={`text-4xl font-extrabold transition-colors duration-500 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Welcome Back
          </h2>
          <p
            className={`text-sm opacity-70 transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <InputGroup name="email" label="Email" type="email" />
          <InputGroup name="password" label="Password" type="password" />
          <button
            type="submit"
            className={`w-full py-3 font-bold transition-all duration-500 ${
              isDark
                ? "bg-linear-to-r from-blue-900 via-purple-900 to-blue-800 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.6)]"
                : "bg-linear-to-r from-purple-400 to-indigo-500 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.4)]"
            }`}
          >
            Login{" "}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-sm opacity-70 border-t pt-4 mt-4 border-gray-300 dark:border-gray-700">
          <p className="transition-colors duration-500">
            Don&apos;t have an account?
          </p>
          <Link
            to="/register"
            className={`underline font-medium transition-colors duration-500 ${
              isDark
                ? "text-purple-400 hover:text-purple-300"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Optional Social Login */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Login with Google
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Login with Github{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
