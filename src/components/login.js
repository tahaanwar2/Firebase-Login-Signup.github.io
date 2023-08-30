import React, { useState } from "react";
import { Form, Input, Checkbox, Modal } from "antd";
import { useAuth } from "../components/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { UserLogin } = useAuth();
  const [err] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email === "" || password === "") {
      return showErrorModal("Fill All The Field");
    }
    try {
      await UserLogin(email, password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return showErrorModal("User Not Found");
      } else if (error.code === "auth/wrong-password") {
        return showErrorModal("Wrong Password");
      } else {
        return showErrorModal(`${error.message}`);
      }
    }
  };
  const showErrorModal = (errorMessage) => {
    Modal.error({
      title: "Error",
      content: errorMessage,
      centered: true,
    });
  };

  return (
    <div className="box">
      {err && <p className="error">{err}</p>}

      <div className="container">
        <form onSubmit={SubmitHandler} className="form">
          <div className="inputfield">
            <h2>Login Form</h2>
            <br />
          </div>

          <div className="inputfield">
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Email </span>}
            >
              {/* <br /> */}
              <Input
                className="input-text"
                type={user.email}
                name="email"
                onChange={UserHandler}
              ></Input>
            </Form.Item>
          </div>

          <div className="inputfield">

            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Password</span>}
            >
              {/* <br /> */}
              <Input.Password
                value={user.password}
                name="password"
                onChange={UserHandler}
              ></Input.Password>
            </Form.Item>
          </div>

          <div className="inputfield">

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox className="remeber" >Remember me</Checkbox>
            </Form.Item>
          </div>

          <div className="inputfield">
            <Form.Item>
              <input
                className="btn btn-success w-90"
                type="submit"
                value="Login"
              />
            </Form.Item>
          </div>

          <p className="inputfield">
            Don't have an account?{" "}
            <Link to={"signup"} className="link">
              {"signup"}
            </Link>
          </p>

        </form>
      </div>

    </div>

  );
};

export default Login;
