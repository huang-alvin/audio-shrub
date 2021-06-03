import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import "../CSS/LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data.errors) {
      setErrors(data.errors);
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-wrapper">
      <div className="login-form-container">
        <p className="login-title">Log in</p>
        <div className="login-divider" />
        <form onSubmit={onLogin} className="login-form">
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="email-div">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <div className="input-email-container">
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                className="input-email"
              />
            </div>
          </div>
          <div className="password-div">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <div className="input-password-container">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                className="input-password"
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
          <button
            type="submit"
            className="login-button"
            onClick={handleDemoLogin}
          >
            Demo Log in
          </button>
          <p className="login-footer">
            Don't have an account? <Link to="/sign-up">Sign up </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
