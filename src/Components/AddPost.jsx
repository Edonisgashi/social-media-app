import React, { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { postsRef } from "../config/firebase";
const AddPost = ({ isDark }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState();

  const addPost = (e) => {
    e.preventDefault();
    // const fileUrl = URL.createObjectURL(photo);
    addDoc(postsRef, {
      likes: 0,
      title: text,
      user: "edonisgashi",
      comments: [{ title: "Say no more...", user: "edonisxgashi" }],
      postedTime: serverTimestamp(),
    }).then((response) => {
      console.log(response);
      e.target.reset();
    });
  };
  return (
    <>
      <form
        onSubmit={addPost}
        action=""
        className={`mt-2 mb-5 d-flex ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <textarea
          name=""
          id=""
          cols="50"
          rows="3"
          placeholder="What's on your mind?"
          className={`bg-${isDark ? "dark text-light" : "light text-dark"}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="d-flex flex-column">
          <input
            type="file"
            className={`m-2 bg-${isDark ? "dark " : "light"}`}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button
            className={`btn btn-outline-${
              isDark ? "light" : "primary"
            } col-6 col-sm-3 m-2`}
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPost;
