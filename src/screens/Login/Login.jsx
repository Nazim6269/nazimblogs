import { Link } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import Button from "../../Components/ui/button/Button";

const Login = () => {
  return (
    <>
      <h2 className="text-center text-3xl font-bold mb-2">Login</h2>
      <form className="w-[42rem] px-[180px] xsm:px-32 msm:px-28 sm:px-20 md:px-8 rounded-lg shadow-lg space-y-6">
        <InputGroup name="email" label={"email"} />

        <InputGroup name="password" label={"password"} />

        <Button type="submit" text={"Login"} />

        <div className="flex justify-center items-center gap-2 text-lg">
          <p>Don{"'"}t have an account?</p>
          <Link
            to={"/register"}
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
