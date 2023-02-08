import React from "react";
import { BsBookmark } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { MdAdd, MdOutlineModeEdit, MdOutlineLogout } from "react-icons/md";
import MenuItem from "./MenuItem";
import { auth } from "../config/firebase";
import { CiDark } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Menu = ({ activeUser, handleTheme }) => {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then((response) => navigate("/login"))
      .catch((error) => console.log(error));
  };
  return (
    <ul className="flex-column align-items-start">
      <MenuItem
        to={`profile/${activeUser?.userID}`}
        Icon={ImProfile}
        text={`${activeUser ? activeUser?.username : "Profile"}`}
        activeUser={activeUser}
      />
      <MenuItem
        to={`/${activeUser?.username}/friends`}
        Icon={FaUserFriends}
        activeUser={activeUser}
        text="Friends"
      />
      <MenuItem
        to={`/${activeUser?.username}/newpost`}
        Icon={MdAdd}
        activeUser={activeUser}
        text="New Post"
      />
      <MenuItem
        to={`/${activeUser?.username}/saved`}
        Icon={BsBookmark}
        activeUser={activeUser}
        text="Bookmarks"
      />
      <MenuItem
        to="/editProfile"
        Icon={MdOutlineModeEdit}
        activeUser={activeUser}
        text="Edit Profile"
      />
      <MenuItem
        to="/"
        Icon={MdOutlineLogout}
        activeUser={activeUser}
        text="Log out"
        signOutUser={signOutUser}
      />
      <li className="nav-item mb-4">
        <h3 className="text-center">
          <CiDark onClick={handleTheme} />
        </h3>
      </li>
    </ul>
  );
};

export default Menu;
