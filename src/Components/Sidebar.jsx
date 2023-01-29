import React from "react";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
const Sidebar = () => {
  return (
    <ul className="nav sidebar flex-column justify-content-around">
      <li className="nav-item mb-4">
        <Link>
          <ImProfile className="mx-2" /> Profile
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link>
          <FaUserFriends className="mx-2" /> Friends
        </Link>
      </li>
      <li className="nav-item mb-4">
        <Link>
          <BsBookmark className="mx-2" /> Saved
        </Link>
      </li>

      <li className="nav-item mb-4">
        <Link>
          <MdGroups className="mx-2" /> Groups
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
