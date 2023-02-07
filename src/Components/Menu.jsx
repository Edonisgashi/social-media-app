import React from "react";
import { BsBookmark } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { MdAdd, MdOutlineModeEdit } from "react-icons/md";
import MenuItem from "./MenuItem";
const Menu = ({ activeUser }) => {
  return (
    <ul className="flex-column align-items-start">
      <MenuItem
        to={`profile/${activeUser?.userID}`}
        Icon={ImProfile}
        text={`${activeUser !== null ? activeUser?.username : "Profile"}`}
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
    </ul>
  );
};

export default Menu;
