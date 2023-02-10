import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
const LikeButton = ({ isDark, post, activeUser }) => {
  const [buttonText, setButtonText] = useState("Like");

  const addLike = async (id) => {
    const postToLike = doc(db, "posts", id);
    const userSnapshot = await getDoc(postToLike);
    const userData = userSnapshot.data();
    const currentLikes = userData.likes;

    let updatedLikes;
    if (buttonText === "Like") {
      setButtonText("Liked");
      updatedLikes = currentLikes + 1;
    } else if (buttonText === "Liked") {
      setButtonText("Like");
      updatedLikes = currentLikes - 1;
    }
    if (updatedLikes >= 0) {
      const updatedPost = {
        ...userData,
        likes: updatedLikes,
      };

      updateDoc(postToLike, updatedPost);
    } else {
      alert("Likes cannot be under 0");
    }
  };
  return (
    <button
      className={`btn btn-${
        isDark ? "outline-light" : " none"
      } d-flex border-0 ${buttonText === "Like" ? "" : "text-primary"}`}
      onClick={(e) => addLike(post.id)}
      disabled={!activeUser}
    >
      <AiOutlineLike className="mx-1" />
      {buttonText}
    </button>
  );
};

export default LikeButton;
