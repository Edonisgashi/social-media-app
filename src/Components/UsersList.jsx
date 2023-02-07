import React, { useContext, useEffect, useState, useMemo } from "react";
import { appContext } from "../Context/AppContext";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const UsersList = ({ isDark }) => {
  const [userList, setUserList] = useState([]);
  const [friend, setFriend] = useState();
  const { users, activeUser, setActiveUser } = useContext(appContext);
  const addFriend = async (user) => {
    console.log(user);
    const userRef = doc(db, "users", activeUser?.id);
    const friendRef = doc(db, "users", user.id);
    const userSnapshot = await getDoc(userRef);
    const friendSnapshot = await getDoc(friendRef);
    const friendData = friendSnapshot.data();
    const firendFriendList = friendData.friends;
    console.log(friendData);
    const userData = userSnapshot.data();
    const friendList = userData.friends;

    const updateUser = {
      ...userData,
      friends: [...friendList, user],
    };
    const updateFriend = {
      ...friendData,
      friends: [...firendFriendList, activeUser],
    };
    updateDoc(userRef, updateUser)
      .then((response) => {
        updateDoc(friendRef, updateFriend);
        setActiveUser({ ...activeUser, friends: [...friendList, user] });
      })
      .catch((err) => console.log(err));
  };
  const filteredUserList = useMemo(() => {
    if (activeUser !== null) {
      return users.filter(
        (user) =>
          user.userID !== activeUser?.userID &&
          activeUser?.friends?.includes(user)
      );
    }
    return [];
  }, [activeUser, users]);

  useEffect(() => {
    setUserList(filteredUserList);
  }, [filteredUserList]);

  return (
    <div
      className="shadow-lg d-none d-lg-flex flex-column align-items-start col-md-2"
      style={{
        position: "fixed",
        top: 120,
        right: 0,
        minHeight: "70vh",
      }}
    >
      <p className="mx-auto text-muted">People you may know</p>
      {userList?.map((user) => {
        return (
          <div className="d-flex align-items-center" key={user?.userID}>
            <button
              className={`btn btn-outline-${
                isDark ? "light" : "primary"
              } border-0 mx-5 my-1`}
              onClick={() => addFriend(user)}
              disabled={activeUser?.friends?.includes(user)}
            >
              {user.username}{" "}
              {activeUser?.friends?.includes(user) ? (
                <SlUserFollowing />
              ) : (
                <IoPersonAddOutline />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
