import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../Context/AppContext";
import { IoPersonAddOutline } from "react-icons/io5";
const UsersList = ({ isDark }) => {
  const [userList, setUserList] = useState([]);
  const { users, currentUser } = useContext(appContext);
  console.log(users);
  useEffect(() => {
    if (currentUser !== null) {
      setUserList(users.filter((user) => user.userID !== currentUser.uid));
      console.log(userList);
    }
  }, []);
  return (
    <div className="shadow-lg">
      {userList?.map((user) => {
        return (
          <div className="d-flex align-items-center">
            <button
              className={`btn btn-outline-${
                isDark ? "light" : "primary"
              } border-0 mx-5 my-1`}
            >
              {user.username} <IoPersonAddOutline />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
