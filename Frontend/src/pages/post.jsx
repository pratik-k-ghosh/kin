import React from "react";
import "../styles/post.css";

function Post() {
  return (
    <div className="form-container">
      <form method="post" className="form">
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
