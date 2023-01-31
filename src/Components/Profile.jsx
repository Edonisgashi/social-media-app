import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../Context/AppContext";

const Profile = ({ isDark }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { users, currentUser, posts } = useContext(appContext);
  const { id } = useParams();
  console.log(users);
  useEffect(() => {
    if (currentUser) {
      setUserProfile(users.find((user) => user.userID === id));
      setUserPosts(posts.filter((post) => post.postID === id));
    }
  }, []);
  console.log(userProfile);
  console.log(userPosts);
  return (
    <>
      {userProfile ? (
        <div
          className={`text-${
            isDark ? "light" : "dark"
          } d-flex flex-column align-items-center`}
        >
          <h1>
            {userProfile.firstName} {userProfile.lastName}
          </h1>
          <p>Joined on : {userProfile.createdAt.toDate().toDateString()}</p>
          <h1>{userProfile.username}</h1>
          <p>{userProfile.birthDate}</p>
          <p>{userProfile.email}</p>
        </div>
      ) : null}
      <h4 className="text-muted">Posts:</h4>
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => {
            return <h2 key={post.postID}>{post.title}</h2>;
          })
        ) : (
          <h1>No posts</h1>
        )}
      </div>
      <div>
        <h2>Friends</h2>
      </div>
    </>
  );
};

export default Profile;
