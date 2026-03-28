import React from "react";
import "../styles/home.css";
import { useState } from "react";

function Home() {
  const [posts, setPosts] = useState([
    {
      caption: "Caption",
      img: "https://ik.imagekit.io/spt0esuxbo/Screenshot_2026-03-17_204946_YMFAU37Qy.png?updatedAt=1774692423061",
      content: "Content",
    },
  ]);

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
