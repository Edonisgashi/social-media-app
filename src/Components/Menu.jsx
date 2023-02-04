import React from "react";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups, MdAdd, MdOutlineModeEdit } from "react-icons/md";
const Menu = ({ currentUser }) => {
  return (
    <ul className="flex-column align-items-start">
      <li className="nav-item mb-4">
        <Link
          to={`profile/${currentUser?.uid}`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <ImProfile className="mx-2" />{" "}
          {currentUser !== null ? <span>{currentUser.displayName}</span> : null}
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link
          to={`/${currentUser?.displayName}/friends`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <FaUserFriends className="mx-2" /> Friends
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link
          to={`/${currentUser?.displayName}/newpost`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <MdAdd className="mx-2" /> New post
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link
          to={`/${currentUser?.displayName}/saved`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <BsBookmark className="mx-2" /> Saved
        </Link>
      </li>

      <li className="nav-item mb-4">
        <Link
          to={`/${currentUser?.displayName}/groups`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <MdGroups className="mx-2" /> Groups
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <MdOutlineModeEdit className="mx-2" /> Edit profile
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
