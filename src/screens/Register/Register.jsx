import { Link } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import Button from "../../Components/ui/button/Button";

const Register = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-3xl font-bold mb-2">Register</h1>
      <form className="w-[42rem] px-[180px] xsm:px-32 msm:px-28 sm:px-20 md:px-8  rounded-lg shadow-lg space-y-6">
        <InputGroup name="firstName" label="First Name" />
        <InputGroup name="lastName" label="Last Name" />
        <InputGroup name="email" label="Email" />
        <InputGroup name="password" label="Password" />
        <Button type="submit" text="Create Account" />
        <div className="flex justify-center items-center gap-2 text-lg">
          <p className="text-gray-700">Already have an account?</p>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
