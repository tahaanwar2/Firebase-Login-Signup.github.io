import { AuthErrorCodes } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserContext } from "../components/UserAuthContext";
import { Form, Input, Modal } from "antd";

const SignUp = () => {
  const navigate = useNavigate();
  const { SignUp } = useAuth();
  const [err, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(abc);
  const UserHandler = (e) => {
    // console.log(e);

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
    const { email, password, confirmPassword } = user;
    if (email === "" || password === "" || confirmPassword === "") {
      setInterval(() => {
        setError("");
      }, 5000);
      return showErrorModal("please fill All the field ");
    } else if (password !== confirmPassword) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("Password does not match");
    } else if (!password.length >= 6 || !confirmPassword.length >= 6) {
      setInterval(() => {
        setError("");
      }, 5000);
      return showErrorModal("Password Must be Greater then 6 Length");
    } else {
      try {
        await SignUp(email, password);
        alert("WellCome New User Create successfully");
        navigate("/");
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setInterval(() => {
            setError("");
          }, 5000);
          showErrorModal("email already in use try another email");
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setInterval(() => {
            setError("");
          }, 5000);
          showErrorModal("Password Must be 6 charecter");
        } else {
          showErrorModal(err.message);
        }
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
        <form onSubmit={SubmitHandler}>
          <div className="inputfield">
            <h2>Registration Form</h2>
          </div>
          <div className="inputfield">
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Email</span>}
              value={user.email}
            >
              <Input name="email" onChange={UserHandler} />
            </Form.Item>
          </div>

          <div className="inputfield">
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Password</span>}
              value={user.password}
            >
              <Input.Password name="password" onChange={UserHandler} />
            </Form.Item>
          </div>
          <div className="inputfield">
            <Form.Item
              label={
                <span style={{ fontWeight: "bold" }}>ConfirmPassword</span>
              }
              value={user.confirmPassword}
            >
              <Input.Password name="confirmPassword" onChange={UserHandler} />
            </Form.Item>
          </div>
          <div className="inputfield">
            <input className="btn btn-success w-90 " type="Submit" />
          </div>
          <p className="inputfield">
            Already Have an account?{" "}
            <Link to={"/"} className="link">
              {"login"}
            </Link>
          </p>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;
