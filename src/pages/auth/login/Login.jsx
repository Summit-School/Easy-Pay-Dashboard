import "./Login.css";
import { useState } from "react";
import ForgotPassword from "../../../components/auth/ForgotPassword";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/reducers/authReducers";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const loginDetails = {
        email: email,
        password: password,
      };

      dispatch(login(loginDetails), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setLoading(false);
            toast.success("Logged in successfully");
            navigate("/dashboard");
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast.error("Email or password is required");
      return;
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <div className="logo">
          <img src="/images/Easy_pay.png" alt="" />
        </div>
        <h3>Easy Pay Login</h3>
        <form>
          <div className="email-div">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password-div">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="submit-button">
            <Link to="#" onClick={handleLogin}>
              <button className="login-btn">
                {loading ? "Loading..." : "Login"}
              </button>
            </Link>
          </div>
        </form>
        <p className="fp-link " onClick={() => setForgotPassword(true)}>
          Forgot Password?
        </p>
      </div>
      <ForgotPassword
        show={forgotPassword}
        onHide={() => setForgotPassword(false)}
      />
    </div>
  );
};

export default Login;
