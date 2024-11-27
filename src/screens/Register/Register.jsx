import { Link } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import Button from "../../Components/ui/button/Button";
import { useTheme } from "../../hooks/useTheme";

const Register = () => {
  const [theme] = useTheme();
  return (
    <div className={`flex w-full min-h-screen items-center justify-center`}>
      <div
        className={`w-full max-w-md px-6 py-8 rounded-lg shadow-lg space-y-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } `}
      >
        <h1
          className={`text-center text-3xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800 "
          }`}
        >
          Register
        </h1>
        <form className="space-y-6">
          <InputGroup name="firstName" label="First Name" />
          <InputGroup name="lastName" label="Last Name" />
          <InputGroup name="email" label="Email" />
          <InputGroup name="password" label="Password" />
          <Button type="submit" text="Create Account" />
        </form>

        <div className="flex justify-center items-center gap-2 text-lg">
          <p className="text-gray-800 dark:text-gray-300">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 underline dark:text-indigo-400"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
