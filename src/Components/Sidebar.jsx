import React, { useContext, useEffect, useRef, useState } from "react";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";

import Offcanvas from "react-bootstrap/Offcanvas";
import { MdGroups, MdAdd, MdMenu, MdClose } from "react-icons/md";
import { appContext } from "../Context/AppContext";
const Sidebar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useContext(appContext);
  const menuRef = useRef(null);

  const handleMenu = () => {
    setShowMenu(true);
    console.log(menuRef.current);
  };
  const handleClose = () => {
    setShowMenu(false);
  };
  console.log(currentUser);
  return (
    <>
      <div class="d-flex align-items-start justify-content-center">
        <button
          className={`btn btn-outline-${
            props.isDark ? "light" : "primary"
          } btn-lg border-0 `}
          onClick={handleMenu}
        >
          <MdMenu />
        </button>
      </div>
      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        {...props}
        className={`my-auto bg-${
          props.isDark ? "dark text-light" : "light text-dark"
        }`}
      >
        <Offcanvas.Header
          className={`text-${
            props.isDark ? "light" : "dark"
          } justify-content-end`}
        >
          <h2>
            <MdClose onClick={handleClose} />
          </h2>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="flex-column">
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
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
