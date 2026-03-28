import React from "react";
import "../styles/home.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([
    {
      caption: "Caption",
      img: "https://ik.imagekit.io/spt0esuxbo/Screenshot_2026-03-17_204946_YMFAU37Qy.png?updatedAt=1774692423061",
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
            <img src={post.img} alt={post.caption} />
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default Home;
