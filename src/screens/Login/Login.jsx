import InputGroup from "../../Components/shared/InputGroup";
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
          <a href="/">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
