import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container auth-page login-page">
      <div className="auth-intro">
        <span className="eyebrow">Your care, connected</span>
        <h2>Welcome back.</h2>
        <p>Access appointments, messages, and the next step in your care journey.</p>
        <div className="auth-mark">+</div>
      </div>
      <div className="auth-panel">
        <span className="form-kicker">Patient portal</span>
        <h3>Sign in to continue</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="form-switch">
            <p>New to Hope?</p>
            <Link to={"/register"}>Create an account</Link>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
