import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../Context/AppContext";

const Profile = ({ isDark }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { users, currentUser } = useContext(appContext);
  console.log(users);
  useEffect(() => {
    if (currentUser) {
      setUserProfile(users.find((user) => user.userID === currentUser.uid));
    }
  }, []);
  console.log(userProfile);
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
        </div>
      ) : null}
    </>
  );
};

export default Profile;
