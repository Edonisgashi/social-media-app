import React, { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import { appContext } from "../Context/AppContext";
import UserAvatar from "./UserAvatar";

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
    <div className="container profile-page">
      <div className="header d-flex align-items-center my-5">
        <UserAvatar
          firstName={userProfile?.firstName}
          lastName={userProfile?.lastName}
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
          {userProfile?.friends?.map((friend) => {
            return <h2>{friend.username}</h2>;
          })}
        </div>
        <div className="stat text-center">
          <p className="text-muted mb-1">Posts</p>
          <p>{userProfile?.posts?.length}</p>
          {userProfile?.posts?.map((post) => {
            return <h2>{post.title}</h2>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// return (
//   <>
//     {userProfile ? (
//       <div
//         className={`text-${
//           isDark ? "light" : "dark"
//         } d-flex flex-column align-items-center`}
//       >
//         <UserAvatar
//           firstName={userProfile?.firstName}
//           lastName={userProfile?.lastName}
//         />
//         <h1>
//           {userProfile.firstName} {userProfile.lastName}
//         </h1>
//         <p>Joined on : {userProfile.createdAt.toDate().toDateString()}</p>
//         <h1>{userProfile.username}</h1>
//         <p>{userProfile.birthDate}</p>
//         <p>{userProfile.email}</p>
//       </div>
//     ) : null}
//     <h4 className="text-muted">Posts:</h4>
//     <div>
//       {userPosts.length > 0 ? (
//         userPosts.map((post) => {
//           return <h2 key={post.postID}>{post.title}</h2>;
//         })
//       ) : (
//         <h1>No posts</h1>
//       )}
//     </div>
//     <div>
//       <h2>Friends</h2>
//     </div>
//   </>
// );
