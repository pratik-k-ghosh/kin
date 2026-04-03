import React from "react";
import "../styles/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post(import.meta.env.VITE_REGISTER_API_URL, formData)
      .then(() => {
        navigate("/verify");
      })
      .catch(() => {
        console.log("Error Registering User");
      });
  };

  return (
    <div className="form-container">
      <h1>Register New User</h1>
      <form onSubmit={handleRegister}>
        <input type="file" name="profilePicture" id="profilePicture" />
        <input type="text" name="userName" placeholder="Username" />
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
        <a href="/login">already have an account? Log in</a>
      </form>
    </div>
  );
}

export default Register;
