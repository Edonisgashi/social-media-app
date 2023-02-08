import React, { useContext, useState } from "react";
import Menu from "./Menu";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdMenu, MdClose } from "react-icons/md";
import { appContext } from "../Context/AppContext";
const Sidebar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeUser } = useContext(appContext);
  const { handleTheme } = props;
  console.log(activeUser);
  const handleMenu = () => {
    setShowMenu(true);
  };
  const handleClose = () => {
    setShowMenu(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 120,
      }}
    >
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
          <Menu activeUser={activeUser} handleTheme={handleTheme} />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-none d-lg-block">
        <Menu activeUser={activeUser} handleTheme={handleTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
