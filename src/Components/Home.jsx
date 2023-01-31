import React, { useState, useContext, useEffect, useRef } from "react";
import { appContext } from "../Context/AppContext";
import { AiOutlineLike, AiOutlineSend, AiOutlineDislike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { db, auth } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import { Modal } from "react-bootstrap";
import UsersList from "./UsersList";

const Home = ({ isDark }) => {
  const { posts, currentUser } = useContext(appContext);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const commentUser = currentUser?.displayName;
  const inputRef = useRef(null);

  const addLike = async (id, index, operator) => {
    const postToLike = doc(db, "posts", id);
    const userSnapshot = await getDoc(postToLike);
    const userData = userSnapshot.data();
    const currentLikes = userData.likes;

    let updatedLikes;
    if (operator === "like") {
      updatedLikes = currentLikes + 1;
    } else if (operator === "dislike") {
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
  const handleShowModal = (id) => {
    setShowModal(true);
    const postComentRef = doc(db, "posts", id);
    getDoc(postComentRef).then((snapshot) =>
      setComments(snapshot.data().comments)
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addComent = (id) => {
    const postToComment = doc(db, "posts", id);
    if (commentText !== "") {
      getDoc(postToComment).then((snapshot) => {
        const postData = snapshot.data();
        updateDoc(postToComment, {
          ...postData,
          comments: [
            ...postData.comments,
            {
              text: commentText,
              user: commentUser,
            },
          ],
        });
        inputRef.current.value = "";
      });
    }
  };
  console.log(currentUser);
  return (
    <div className="d-flex">
      <Sidebar isDark={isDark} />
      <div className="timeline d-flex flex-column col-md-6 col-lg-7 mx-auto my-5">
        {currentUser !== null ? (
          <AddPost className="position-top" isDark={isDark} />
        ) : null}
        {posts?.length > 0 &&
          posts?.map((post, i) => {
            return (
              <div key={i}>
                {post.user ? <span>{post.user}</span> : null}
                <br />
                <span className="text-muted">
                  {post.postedTime?.toDate().toLocaleString()}
                </span>
                <h2>{post?.title}</h2>
                <div className="post_img col-4 col-sm-5 col-md-6 col-lg-7">
                  {post.image ? (
                    <img src={post.image} className="img-fluid mx-auto" />
                  ) : null}
                </div>
                <div className="actions d-flex flex-column justify-content-start my-3 align-items-start">
                  <p className="text-muted">{post?.likes}</p>
                  <div className="d-flex justify-content-start">
                    <button
                      className={`btn btn-${
                        isDark ? "outline-light" : " none"
                      } d-flex border-0`}
                      onClick={(e) => addLike(post.id, i, "like")}
                      disabled={currentUser === null}
                    >
                      <AiOutlineLike className="mx-1" />
                      Like
                    </button>

                    <button
                      className={`btn btn-${
                        isDark ? "outline-light" : " none"
                      } d-flex border-0`}
                      onClick={(e) => addLike(post.id, i, "dislike")}
                      disabled={currentUser === null}
                    >
                      <AiOutlineDislike className="mx-1" />
                      Dislike
                    </button>

                    <input
                      ref={inputRef}
                      type="textarea"
                      className={`${
                        isDark ? "bg-dark text-light" : "bg-light text-dark"
                      } border-${isDark ? "light" : "dark"}`}
                      placeholder="Add a comment"
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className={`btn btn-${
                        isDark ? "outline-light" : "outline-primary"
                      } border-${isDark ? "light" : "dark"}`}
                      onClick={() => addComent(post.id)}
                      disabled={currentUser === null}
                    >
                      <AiOutlineSend />
                    </button>
                  </div>

                  <button
                    className={`btn btn-${
                      isDark ? "outline-light" : "primary"
                    }`}
                    onClick={() => handleShowModal(post.id)}
                    disabled={currentUser === null}
                  >
                    Show Comments{" "}
                    <span className="mx-1">{post.comments.length}</span>
                  </button>

                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header
                      closeButton
                      style={{
                        backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                        color: isDark ? "#f8f9fa" : "#343a40",
                      }}
                    >
                      <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      style={{
                        backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                        color: isDark ? "#f8f9fa" : "#343a40",
                      }}
                    >
                      {post.comments
                        ? comments?.map((comment, i) => (
                            <div key={i}>
                              <p>
                                <span className="mx-2 text-muted">
                                  {comment.user === ""
                                    ? "Anonymous"
                                    : comment.user}
                                </span>
                                : {comment.text}
                              </p>
                            </div>
                          ))
                        : null}
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            );
          })}
      </div>
      <UsersList isDark={isDark} />
    </div>
  );
};

export default Home;
