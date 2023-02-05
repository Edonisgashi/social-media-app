import React, { useContext, useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdMenu, MdClose } from "react-icons/md";
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
      <div className="d-flex align-items-start d-lg-none justify-content-center">
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
        className={`my-auto  bg-${
          props.isDark ? "dark text-light" : "light text-dark"
        }`}
        style={{ maxWidth: "fitContent" }}
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
          <Menu currentUser={currentUser} />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-none d-lg-block">
        <Menu currentUser={currentUser} />
      </div>
    </>
  );
};

export default Sidebar;
