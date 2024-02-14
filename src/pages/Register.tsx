/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import RegisterForm from "../components/authForm/RegisterForm";
import RegisterInput from "../components/authForm/RegisterInput";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    const toastId = toast.loading("Registering user!");

    try {
      const response = await registerUser(data).unwrap();
      console.log(response);
      toast.success("Register successful!", { id: toastId, duration: 2000 });
      navigate('/login')
      // Optionally, you can handle further actions after successful registration
    } catch (error: any) {
      console.log()
      toast.error(`Something went wrong! ${error?.data?.message} !`, { id: toastId, duration: 2000 });
     
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className=" rounded p-5" style={{ border: "1px solid gray" }}>
      <h1 className="pb-5">Please Register !</h1>

        <RegisterForm onSubmit={onSubmit}>
          <RegisterInput type="text" name="username" label="Username:" />
          <RegisterInput type="text" name="email" label="Email:" />
          <RegisterInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Register</Button>
          
        </RegisterForm>
        <div className="authNavigate">
        <span>Already register? <NavLink to="/login"> Please Login</NavLink></span>
    </div>
      </div>
    </Row>
  );
};

export default Register;
