import "./Login.css";

const Login = () => {
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
            />
          </div>
          <div className="password-div">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="submit-button">
            <button className="form-control bg-primary text-light font-weight-bold mt-4">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
