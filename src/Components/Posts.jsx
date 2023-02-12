import React, { useState, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { Modal } from "react-bootstrap";
import SelectAction from "./SelectAction";
import { db } from "../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import LikeButton from "./LikeButton";
const Posts = (props) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { post, i, isDark, activeUser, fullWidth } = props;
  const [showModal, setShowModal] = useState(false);

  const [comments, setComments] = useState([]);

  const inputRef = useRef(null);

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

  const commentUser = activeUser?.username;
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
  return (
    <div
      key={i}
      className={`${
        fullWidth ? "col-12 " : "col-10 col-sm-6 "
      } p-4 shadow-lg my-4 mx-auto`}
    >
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
        <div className="d-flex flex-wrap col-6 justify-content-start ">
          <LikeButton post={post} isDark={isDark} activeUser={activeUser} />
          <button
            className={`btn btn-${
              isDark ? "outline-light" : " none"
            } d-flex border-0`}
            onClick={() => setShowCommentInput(true)}
            disabled={!activeUser}
          >
            <MdOutlineComment className="mx-1" />
            Comment
          </button>
          <SelectAction isDark={isDark} post={post} />

          {showCommentInput ? (
            <div className="d-flex ">
              <input
                ref={inputRef}
                type="textarea"
                className={`${
                  isDark ? "bg-dark text-light" : "bg-light text-dark"
                } border-${isDark ? "light" : "dark"} my-1`}
                placeholder="Add a comment"
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button
                className={`btn btn-${
                  isDark ? "outline-light" : "outline-primary"
                } border-${isDark ? "light" : "dark"}`}
                onClick={() => addComent(post.id)}
                disabled={!activeUser}
              >
                <AiOutlineSend />
              </button>
            </div>
          ) : null}
        </div>

        <button
          className="btn btn-link"
          onClick={() => handleShowModal(post.id)}
          disabled={!activeUser}
        >
          Show Comments
          <span className="mx-1">{post.comments.length}</span>
        </button>
      </div>
      <div>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          style={{
            maxWidth: "100vw",
            position: "fixed",
            top: "50%",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
            transform: "translateY(-50%,-50%)",
          }}
        >
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
            {post.comments?.length > 0 ? (
              comments?.map((comment, i) => (
                <div key={i}>
                  <p>
                    <span className="mx-2 text-muted">
                      {comment.user === "" ? "Anonymous" : comment.user}
                    </span>
                    : {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <h2>No comments to show</h2>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Posts;
