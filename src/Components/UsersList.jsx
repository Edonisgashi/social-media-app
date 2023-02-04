import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../Context/AppContext";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { db, usersRef } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const UsersList = ({ isDark }) => {
  const [userList, setUserList] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const [friend, setFriend] = useState();
  const { users, currentUser } = useContext(appContext);
  const addFriend = async (user) => {
    console.log(user);
    const userRef = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const friendList = userData.friends;

    const updateUser = {
      ...userData,
      friends: [...friendList, user],
    };
    updateDoc(userRef, updateUser)
      .then((response) =>
        setActiveUser({ ...activeUser, friends: [...friendList, user] })
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (currentUser !== null) {
      setUserList(users.filter((user) => user.userID !== currentUser.uid));
      console.log(userList);
      setActiveUser(users.find((user) => currentUser.uid === user.userID));
      console.log(activeUser);
    }
  }, []);
  return (
    <div className="shadow-lg d-none d-lg-flex flex-column align-items-start col-md-2">
      <p className="mx-auto text-muted">People you may know</p>
      {userList?.map((user) => {
        return (
          <div className="d-flex align-items-center">
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
