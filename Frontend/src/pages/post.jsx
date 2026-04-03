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
      .post(import.meta.env.VITE_CREATE_POST_API_URL, formData, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Error creating post");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="caption"
          id="caption"
          placeholder="Enter Caption"
        />
        <input type="file" name="img" id="img" />
        <textarea name="content" id="content" placeholder="Enter Content" />
        <div className="btns">
          <button type="submit">Post</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
