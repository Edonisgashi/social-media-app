import React, { useContext, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { appContext } from "../Context/AppContext";
const Sidebar = () => {
  const { currentUser } = useContext(appContext);

  return (
    <ul className="nav sidebar flex-column justify-content-around">
      <li className="nav-item mb-4">
        <Link
          to={`profile/${currentUser?.uid}`}
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <ImProfile className="mx-2" /> Profile
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link
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
          style={{
            pointerEvents: currentUser === null ? "none" : "auto",
            color: currentUser === null ? "grey" : "#007bff",
          }}
        >
          <MdGroups className="mx-2" /> Groups
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
