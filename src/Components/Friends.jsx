import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../Context/AppContext";

const Friends = () => {
  const [activeUser, setActiveUser] = useState();
  const { users, currentUser } = useContext(appContext);
  const { profile } = useParams();
  console.log(profile);
  useEffect(() => {
    setActiveUser(users?.find((user) => user?.userID === currentUser?.uid));
    console.log(activeUser);
  }, [profile]);
  return (
    <>
      {activeUser?.friends?.map((friend) => {
        return <h2 key={friend.userID}>{friend.username}</h2>;
      })}
    </>
  );
};

export default Friends;
