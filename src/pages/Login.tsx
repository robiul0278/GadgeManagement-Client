/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row } from "antd";
import { FieldValues,} from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "./../utils/verifyToken";
// import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import LoginInput from "../components/authForm/LoginInput";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../components/authForm/LoginForm";
import { Button } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: "robiul0278@gmail.com",
    password: "robiul0278",
  };

  const [Login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in!");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      console.log(userInfo);

      const res = await Login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in!", { id: toastId, duration: 2000 });

      navigate(`/${user.role}/dashboard`);
      // console.log(user)
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (


    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className=" rounded p-5" style={{ border: "1px solid gray" }}>
      <h1 className="pb-5">Please Login !</h1>
        <LoginForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <LoginInput type="text" name="email" label="Email:" />
          <LoginInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
        </LoginForm>
        <div className="authNavigate">
          <span>
            New user? <NavLink to="/register"> Please Register</NavLink>
          </span>
        </div>
      </div>
    </Row>
  );
};

export default Login;
