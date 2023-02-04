import React, { useContext, useState, useEffect } from "react";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { postsRef, db } from "../config/firebase";
import { appContext } from "../Context/AppContext";
const AddPost = ({ isDark }) => {
  const [text, setText] = useState("");
  const [activeUser, setActiveUser] = useState();
  const [photo, setPhoto] = useState();
  const { currentUser, users } = useContext(appContext);

  const addPost = async (e) => {
    e.preventDefault();
    const userPost = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userPost);
    const userData = userSnapshot.data();
    const currentPosts = userData.posts;
    const currentDate = new Date();
    console.log(currentPosts);
    console.log(currentUser);
    const post = {
      likes: 0,
      postID: currentUser.uid,
      title: text,
      user: currentUser.displayName,
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
  useEffect(() => {
    setActiveUser(users.find((user) => user.userID === currentUser.uid));
    console.log(activeUser);
  }, []);
  return (
    <>
      <form
        onSubmit={addPost}
        action=""
        className={`col-6 flex-wrap mt-2 mb-5 d-flex ${
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
            } col-6 col-sm-8 m-2`}
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPost;
