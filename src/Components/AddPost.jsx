import React, { useContext, useState } from "react";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { postsRef, db } from "../config/firebase";
import { appContext } from "../Context/AppContext";
const AddPost = ({ isDark }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState();
  const { activeUser } = useContext(appContext);

  const addPost = async (e) => {
    e.preventDefault();
    const userPost = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userPost);
    const userData = userSnapshot.data();
    const currentPosts = userData.posts;
    const currentDate = new Date();

    const post = {
      likes: 0,
      postID: activeUser.userID,
      title: text,
      user: activeUser.username,
      comments: [],
      postedTime: currentDate,
    };
    if (text !== "") {
      addDoc(postsRef, post).then((response) => {
        console.log(response);
        e.target.reset();
      });
      const updatedUser = {
        ...userData,
        posts: [...currentPosts, post],
      };
      updateDoc(userPost, updatedUser)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form
        onSubmit={addPost}
        action=""
        className={`col-6 flex-wrap mt-2 mb-5 d-flex flex-column ${
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
          <label
            htmlFor="file"
            className={`btn btn-outline-${
              isDark ? "light" : "primary"
            } col-3 my-2`}
          >
            Choose File
          </label>
          <input
            type="file"
            id="file"
            className={`d-none`}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button
            className={`btn btn-outline-${isDark ? "light" : "primary"} col-3 `}
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPost;
