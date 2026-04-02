import React from "react";
import "../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:3000/api/auth/login", data, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Error Logging in User");
      });
  };

  return (
    <div className="form-container">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="identifier" placeholder="Username or Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Log in</button>
        <a href="/register">Don't have an account? Register</a>
      </form>
    </div>
  );
}

export default Login;
