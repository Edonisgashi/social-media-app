import React, { useContext, useState } from "react";
import Menu from "./Menu";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdMenu, MdClose } from "react-icons/md";
import { appContext } from "../Context/AppContext";
const Sidebar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeUser } = useContext(appContext);
  const { handleTheme, isDark } = props;

  const handleMenu = () => {
    setShowMenu(true);
  };
  const handleClose = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <div className="d-flex align-items-start justify-content-center">
        <button
          className={`btn btn-${
            isDark ? "dark" : "none"
          } border btn-lg border-0 text-light`}
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
          isDark ? "dark text-light" : "light text-dark"
        }`}
        style={{ maxWidth: "fitContent" }}
        placement="end"
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
          <Menu
            activeUser={activeUser}
            handleTheme={handleTheme}
            isDark={isDark}
            handleClose={handleClose}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
