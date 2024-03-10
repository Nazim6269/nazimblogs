import InputGroup from "../../Components/shared/InputGroup";
import Button from "../../Components/ui/button/Button";
import styled from "./register.module.css";

const Register = () => {
  return (
    <div>
      <h2 style={{ color: "#ffffff" }}>Register</h2>
      <form className={styled.form}>
        <InputGroup name={"firstName"} label={"first name"} />

        <InputGroup name="lastName" label={"last name"} />

        <InputGroup name="email" label={"email"} />

        <InputGroup name="password" label={"password"} />

        <Button type="submit" text={"Create Account"} />

        <div className={styled.formFooter}>
          <p>Already have an account?</p>
          <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
