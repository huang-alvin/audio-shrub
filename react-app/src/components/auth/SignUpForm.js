import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import "../CSS/SignUpForm.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-wrapper">
      <div className="login-form-container">
        <p className="login-title">Sign in</p>
        <div className="login-divider" />
        <form onSubmit={onSignUp} className="login-form">
          <div>
            <label className="login-label">User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              className="sign-up-input"
            ></input>
          </div>
          <div>
            <label className="login-label">Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              className="sign-up-input"
            ></input>
          </div>
          <div>
            <label className="login-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              className="sign-up-input"
            ></input>
          </div>
          <div>
            <label className="login-label">Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className="sign-up-input"
            ></input>
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
          <p className="login-footer">
            Have an account already? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
