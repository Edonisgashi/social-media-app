import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";
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
    <Button
      style={{ backgroundColor: "transparent" }}
      className={` d-flex border-0 align-items-center text-${
        isDark ? "light" : "dark"
      } `}
      onClick={(e) => addLike(post.id)}
      disabled={!activeUser}
    >
      <h5 className={`mx-1 ${buttonText === "Like" ? "" : "text-primary"}`}>
        <AiOutlineLike />
      </h5>
      <h5
        className={`d-none d-sm-block ${
          buttonText === "Like" ? "" : "text-primary"
        }`}
      >
        {buttonText}
      </h5>
    </Button>
  );
};

export default LikeButton;
