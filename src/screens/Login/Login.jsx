import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { googleProvider, githubProvider } from "../../firebase";

const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const { socialLogin } = useAuth();

  const handleSocialLogin = async (provider) => {
    setError("");
    try {
      await socialLogin(provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className={`flex min-h-screen w-full items-start justify-center transition-colors duration-500 `}
    >
      <div
        className={`w-full max-w-lg px-10 py-12 rounded-3xl shadow-2xl space-y-8 transition-all duration-500
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
            className={`underline font-medium transition-colors duration-500 ${isDark
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
            onClick={() => handleSocialLogin(googleProvider)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${isDark
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            Login with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(githubProvider)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${isDark
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
