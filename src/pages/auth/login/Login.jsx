import "./Login.css";
import { useState } from "react";
import ForgotPassword from "../../../components/auth/ForgotPassword";
import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { login } from "../../redux/reducers/authReducers";
import { loginAdmin, registerAdmin } from "../../../api/auth.admin";
import * as uuid from "uuid";

import { sendPushNotification } from "../../../api/oneSignal";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const id = uuid.v4();

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      loginAdmin(email, password).then((res) => {
        if (res.email === email) {
          localStorage.setItem(
            "easykingspay-admin",
            JSON.stringify({
              docId: res.docId,
              id: res.id,
              email: res.email,
            })
          );
          setLoading(false);
          toast.success("Logged in successfully");
          navigate("/dashboard");
        } else {
          setLoading(false);
          toast.error("Authentication failed");
        }
      });

      // dispatch(login(loginDetails), setLoading(true))
      //   .then((res) => {
      //     if (res.meta.requestStatus === "fulfilled") {
      //       setLoading(false);
      //       toast.success("Logged in successfully");
      //       navigate("/dashboard");
      //     }
      //     if (res.meta.requestStatus === "rejected") {
      //       setLoading(false);
      //       toast.error(res.payload);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    } else {
      toast.error("Email or password is required");
      return;
    }
  };

  // sendPushNotification();

  return (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <div className="logo">
          <img src="/images/Easy_pay.png" alt="" />
        </div>
        <h3>Easy Kings Pay Login</h3>
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
