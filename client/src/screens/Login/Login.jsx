import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { googleProvider, githubProvider } from "../../firebase";
import toast from "react-hot-toast";

const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, user, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access, or default to home
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginToast = toast.loading("Logging in...");
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!", { id: loginToast });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed", { id: loginToast });
    }
  };

  const handleSocialLogin = async (provider) => {
    const socialToast = toast.loading("Connecting...");
    try {
      await socialLogin(provider);
      toast.success("Login successful!", { id: socialToast });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Social login failed", { id: socialToast });
    }
  };

  return (
    <div
      className={`flex min-h-screen w-full items-start justify-center transition-colors duration-500 `}
    >
      <div
        className={`w-full max-w-lg px-10 py-12 rounded-md shadow-md space-y-8 transition-all duration-500
        ${isDark
            ? "bg-gray-900/90 border border-gray-700 text-gray-200"
            : "bg-white border border-gray-200 text-gray-900"
          }`}
      >
        {/* Title + Subtitle */}
        <div className="text-center space-y-2">
          <h2
            className={`text-4xl font-extrabold transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-900"
              }`}
          >
            Welcome Back
          </h2>
          <p
            className={`text-sm opacity-70 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputGroup
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputGroup
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`w-full py-3 font-bold transition-all duration-500 ${isDark
              ? "bg-brand-primary text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
              : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary hover:shadow-md hover:shadow-violet-500/50"
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
            className={`underline font-medium transition-colors duration-500 ${isDark
              ? "text-brand-tertiary hover:text-purple-300"
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
            onClick={() => handleSocialLogin(googleProvider)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-500 ${isDark
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            Login with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(githubProvider)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-500 ${isDark
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
