import React, { useState, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { Modal } from "react-bootstrap";
import SelectAction from "./SelectAction";
import { db } from "../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import TruncateText from "./TruncateText";
const Posts = (props) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { post, i, isDark, activeUser, fullWidth } = props;
  const [showModal, setShowModal] = useState(false);

  const [comments, setComments] = useState([]);

  const inputRef = useRef(null);

  const convertNum = (num) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num < 1000) {
      return num;
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
      className={`mx-5 pb-5 mx-md-auto ${
        fullWidth ? "col-12" : "col-12 col-md-8"
      } ${isDark ? "border__dark" : ""} p-4 my-4 shadow `}
      style={{ maxWidth: "80%" }}
    >
      {post.user ? (
        <Link className="user-link" to={`/profile/${post.postID}`}>
          <p className="text-muted">{post.user}</p>
        </Link>
      ) : null}

      <span className="text-muted">
        {post.postedTime?.toDate().toLocaleString()}
      </span>
      <TruncateText text={post?.title} isDark={isDark} />
      <div className="post_img col-12">
        {post.image ? (
          <img
            src={post.image}
            className="img-fluid w-100"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        ) : null}
      </div>
      <div className="actions d-flex flex-column justify-content-start my-3 align-items-start">
        <div className="d-flex col-12 justify-content-around align-items-center">
          <p>
            {convertNum(post.likes)}
            <span className="mx-1">
              {post?.likes > 1 || post?.likes === 0 ? "Likes" : "Like"}
            </span>
          </p>

          <p
            className="mx-1"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal(post.id)}
          >
            {post.comments.length} Comments
          </p>
        </div>
        <div
          className={`${
            isDark ? "border_dark" : "border_light"
          } d-flex flex-wrap col-12 py-3  justify-content-around`}
        >
          <LikeButton post={post} isDark={isDark} activeUser={activeUser} />
          <button
            style={{ backgroundColor: "transparent" }}
            className={` d-flex border-0 align-items-center text-${
              isDark ? "light" : "dark"
            }`}
            onClick={() => setShowCommentInput(!showCommentInput)}
            disabled={!activeUser}
          >
            <h5 className="mx-1">
              <MdOutlineComment />
            </h5>
            <h5 className="d-none d-sm-block"> Comment</h5>
          </button>
          <SelectAction isDark={isDark} post={post} />
        </div>
        {showCommentInput ? (
          <div className="d-flex mx-auto align-items-center">
            <div style={{ position: "relative" }} className="w-100 my-2">
              <input
                ref={inputRef}
                type="textarea"
                className={`${
                  isDark ? "bg-dark text-light" : "bg-light text-dark"
                } border-${isDark ? "light" : "dark"} `}
                placeholder="Add a comment"
                onChange={(e) => setCommentText(e.target.value)}
                style={{ paddingRight: "40px" }}
              />

              {commentText?.length > 0 ? (
                <button
                  className={`btn btn-${
                    isDark ? "outline-light " : "outline-primary"
                  } border-${
                    isDark ? "light" : "dark"
                  } position-absolute end-0 top-50 translate-middle-y border-0`}
                  onClick={() => addComent(post.id)}
                  disabled={!activeUser}
                >
                  <AiOutlineSend />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
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
