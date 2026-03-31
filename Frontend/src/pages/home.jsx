import React from "react";
import "../styles/home.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([
    {
      caption: "Caption",
      img: "test link",
      content: "Content",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.error("Error fetching posts:", e);
      });
  }, []);

  return (
    <div className="home-container">
      <h1> Kin </h1>
      <a href="/post">Create Post</a>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post">
            <h2>{post.caption}</h2>
            {post.img !== "" && <img src={post.img} alt={post.caption} />}
            <p>{post.content !== "" && post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default Home;
