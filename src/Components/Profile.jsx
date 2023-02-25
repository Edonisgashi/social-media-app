import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../Context/AppContext";
import UserAvatar from "./UserAvatar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Posts from "./Posts";
const Profile = ({ isDark }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [showFriends, setShowFriends] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  const handleClosePosts = () => setShowPosts(false);
  const handleShowPosts = () => setShowPosts(true);

  const handleClose = () => setShowFriends(false);
  const handleShow = () => setShowFriends(true);
  const { users, currentUser, activeUser, posts } = useContext(appContext);
  const { id } = useParams();

  useEffect(() => {
    if (currentUser) {
      setUserProfile(users.find((user) => user.userID === id));
    }
  }, [activeUser]);

  return (
    <div className="container profile-page py-5 ">
      <img
        src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
        alt=""
        className="img img-fluid shadow-lg"
        style={{
          height: "400px",
          objectFit: "cover",
          width: "100%",
        }}
      />
      <div className=" d-flex align-items-center my-5">
        <img
          src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=456&q=80"
          alt=""
          style={{ width: "170px", height: "170px", borderRadius: "50%" }}
          className="img-fluid mx-5"
        />

        <div>
          <h1 className="mb-0">
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
        </div>
      </div>

      <div className="stats d-flex justify-content-around mt-5">
        <div className="stat text-center">
          <p className="text-muted mb-1">Friends</p>
          <p>{userProfile?.friends?.length}</p>
          <>
            <Button
              variant={`${isDark ? "dark" : "primary"}`}
              className="border"
              onClick={handleShow}
            >
              See all Friends
            </Button>

            <Modal
              show={showFriends}
              onHide={handleClose}
              style={{
                backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                color: isDark ? "#f8f9fa" : "#343a40",
              }}
            >
              <Modal.Header
                closeButton
                style={{
                  backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                  color: isDark ? "#f8f9fa" : "#343a40",
                }}
              >
                <Modal.Title>Friend List</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                  color: isDark ? "#f8f9fa" : "#343a40",
                }}
              >
                {userProfile?.friends?.map((friend) => {
                  return (
                    <h2 key={friend.username} className="my-3">
                      {" "}
                      <UserAvatar
                        firstName={friend?.firstName}
                        lastName={friend?.lastName}
                      />{" "}
                      {friend.username}
                    </h2>
                  );
                })}
              </Modal.Body>
            </Modal>
          </>
        </div>
        <div className="stat text-center mb-5 mb-md-0 pb-5">
          <p className="text-muted mb-1">Posts</p>
          <p>{userProfile?.posts?.length}</p>
          <>
            <Button
              variant={`${isDark ? "dark" : "primary"}`}
              className="border"
              onClick={handleShowPosts}
            >
              See all posts
            </Button>

            <Modal
              show={showPosts}
              onHide={handleClosePosts}
              style={{
                backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                color: isDark ? "#f8f9fa" : "#343a40",
              }}
            >
              <Modal.Header
                closeButton
                style={{
                  backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                  color: isDark ? "#f8f9fa" : "#343a40",
                }}
              >
                <Modal.Title>Posts</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                  color: isDark ? "#f8f9fa" : "#343a40",
                }}
              >
                {userProfile?.posts?.length > 0 ? (
                  userProfile?.posts?.map((post, i) => {
                    return (
                      <Posts
                        post={post}
                        key={i}
                        isDark={isDark}
                        activeUser={activeUser}
                        fullWidth="fullWidth"
                      />
                    );
                  })
                ) : (
                  <h2>No posts to show</h2>
                )}
              </Modal.Body>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default Profile;
