import React from "react";
import "../styles/post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Post() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post("http://localhost:3000/api/post/create", formData)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Error creating post");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="caption"
          id="caption"
          placeholder="Enter Caption"
        />
        <input type="file" name="img" id="img" />
        <textarea name="content" id="content" placeholder="Enter Content" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default Post;
