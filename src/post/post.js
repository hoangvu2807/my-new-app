import React from "react";

import "./post.css";

export function Post({ content, index }) {
  return (
    <div className={`postWrapper color${index % 4}`}>
      <div className={`somebodySaid color${index % 4}`}>Somebody said...</div>
      <div className="postContainer">{content}</div>
    </div>
  );
}
