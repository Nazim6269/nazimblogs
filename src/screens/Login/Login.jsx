import { Link } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import Button from "../../Components/ui/button/Button";
import styled from "../Register/register.module.css";

const Login = () => {
  return (
    <div>
      <h2 style={{ color: "#ffffff" }}>Login</h2>
      <form className={styled.form}>
        <InputGroup name="email" label={"email"} />

        <InputGroup name="password" label={"password"} />

        <Button type="submit" text={"Login"} />

        <div className={styled.formFooter}>
          <p>Don{"'"}t have an account?</p>
          <Link to={"/register"}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
